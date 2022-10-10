import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import { iDriverData } from '../../interfaces/interface';
import { FirestoreService } from '../../services/firestore.service';

declare var google;

@Component({
  selector: 'app-pass-map',
  templateUrl: './pass-map.component.html',
  styleUrls: ['./pass-map.component.scss'],
})
export class PassMapComponent implements OnInit, AfterViewInit {

  constructor(private firestore: FirestoreService, private loadingCtrl: LoadingController, private service: GlobalService) { }

  @ViewChild('mapPass') mapRef: ElementRef<HTMLElement>;
  map = null;
  marker: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  driverData: iDriverData;
  loading: any;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.createMap();
  }

  async ionViewWillEnter() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    this.loading.present();
    this.firestore.getCollection<iDriverData>('Drivers').subscribe(e => {
      for(let i = 0; i < e.length; i++) {
        // console.log(e[i].passengers);
        if(e[i].passengers.includes(localStorage.getItem('userMail'))) {
          this.driverData = e[i];
          this.createRoute();
        }
      }
    });
    this.loading.dismiss();
  }

  ionViewDidLeave() {
    this.directionsRenderer.setMap(null);
  }

  createRoute() {
    this.directionsRenderer.setMap(null);
    this.directionsRenderer.setMap(this.map);
    this.directionsService.route({
      origin: { lat: -33.033648, lng: -71.5329167 },
      destination: { lat: Number(this.driverData.lat), lng: Number(this.driverData.lng) },
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(response);
      } else {
        this.service.presentAlert("Error", "No se pudo calcular la ruta");
        // this.router.navigate(['driver/driver-config']);
        console.log(response);
        console.log(status);
      }
    }, 2000);
  }

  async createMap() {
    this.map = new google.maps.Map(document.getElementById("mapPass") as HTMLElement, {
      disableDefaultUI: true,
      clickableIcons: false,
      center: {
        lat: -33.033648,
        lng: -71.5329167
      },
      zoom: 15,
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
