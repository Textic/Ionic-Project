import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { GlobalService } from 'src/app/global.service';
import { iDriverData, iUserData } from '../../interfaces/interface';
import { FirestoreService } from '../../services/firestore.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.scss'],
})
export class DriverMapComponent implements OnInit, AfterViewInit {

  constructor(private service: GlobalService, private firestore: FirestoreService, private geolocation: Geolocation) { }

  @ViewChild('mapDriver') mapRef: ElementRef<HTMLElement>;
  map = null;
  marker: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  lsMail = localStorage.getItem('userMail');
  usersData: iUserData[] = [];

  lsLat = Number(localStorage.getItem('driverLat'));
  lsLng = Number(localStorage.getItem('driverLng'));

  watch = this.geolocation.watchPosition();

  ngOnInit() {
    const modal = document.querySelector('ion-modal');

    modal.isOpen = true;
    modal.breakpoints = [0.2, 0.65];
    modal.backdropBreakpoint = 0.3;
    modal.backdropDismiss = false;
    modal.showBackdrop = true;
    modal.initialBreakpoint = 0.2;
  }

  ionViewWillLeave() {
    const modal = document.querySelector('ion-modal');
    modal.isOpen = false;
  }

  ngAfterViewInit() {
    this.createMap();
  }

  ionViewDidEnter() {
    const modal = document.querySelector('ion-modal');
    modal.isOpen = true;
    this.lsLat = Number(localStorage.getItem('driverLat'));
    this.lsLng = Number(localStorage.getItem('driverLng'));
    this.directionsRenderer.setMap(this.map);
    this.directionsService.route({
      origin: { lat: -33.033648, lng: -71.5329167 },
      destination: { lat: this.lsLat, lng: this.lsLng },
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(response);
      } else {
        this.service.presentAlert("Error", "No se pudo calcular la ruta, verifique que los datos esten ingresados correctamente en la configuración");
        // this.router.navigate(['driver/driver-config']);
        console.log(response);
        console.log(status);
      }
    }, 2000);

    this.firestore.getCollectionById<iDriverData>('Drivers', this.lsMail).subscribe(e => {
      this.usersData = [];
      for(let i = 0; i < e.passengers.length; i++) {
        this.firestore.getCollectionById<iUserData>('Users', e.passengers[i]).pipe(take(1)).subscribe(resp => {
          this.usersData.push(resp);
        })
      }
      // console.log(this.usersData);
    });
  }

  ionViewDidLeave() {
    this.directionsRenderer.setMap(null);
  }

  async createMap() {
    this.map = new google.maps.Map(document.getElementById("mapDriver") as HTMLElement, {
      disableDefaultUI: true,
      clickableIcons: false,
      center: {
        lat: -33.033648,
        lng: -71.5329167
      },
      zoom: 15,
    });
    this.watch.subscribe((e: any) => {  // current location
      console.log(e);
      if (this.marker) {  //    check if marker is already added
        this.marker.setMap(null);
      }
      this.marker = new google.maps.Marker({
        position: {
          lat: e.coords.latitude,
          lng: e.coords.longitude
        },
        map: this.map,
        title: 'Tu localizacion',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      });
      this.marker.setMap(this.map);
    });
    if (localStorage.getItem('theme') == 'dark') {
      this.map.setOptions({
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      });
    }
  }
}
