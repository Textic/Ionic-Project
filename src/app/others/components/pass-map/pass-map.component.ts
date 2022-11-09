import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { GlobalService } from 'src/app/global.service';
import { iDriverData } from '../../interfaces/interface';
import { FirestoreService } from '../../services/firestore.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

export declare var google;

@Component({
  selector: 'app-pass-map',
  templateUrl: './pass-map.component.html',
  styleUrls: ['./pass-map.component.scss'],
})
export class PassMapComponent implements OnInit, AfterViewInit {

  constructor(private firestore: FirestoreService, private loadingCtrl: LoadingController, private service: GlobalService, private geolocation: Geolocation) { }

  @ViewChild('mapPass') mapRef: ElementRef<HTMLElement>;
  map = null;
  marker: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  driverData: iDriverData;
  driverDataNull: iDriverData
  loading: any;
  myDriver: string;

  ngOnInit() {
    const modal = document.querySelector('ion-modal');

    modal.isOpen = true;
    modal.breakpoints = [0.2, 0.65];
    modal.backdropBreakpoint = 0.3;
    modal.backdropDismiss = false;
    modal.showBackdrop = true;
    modal.initialBreakpoint = 0.2;
  }
  
  ngAfterViewInit() {
    this.createMap();
  }
  
  ionViewDidEnter() {
    const modal = document.querySelector('ion-modal');
    modal.isOpen = true;
  }

  ionViewWillLeave() {
    const modal = document.querySelector('ion-modal');
    modal.isOpen = false;
    this.service.passMapSub.unsubscribe();
    this.service.passWatch.unsubscribe();
  }


  async ionViewWillEnter() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    await this.loading.present();
    this.firestore.getCollection<iDriverData>('Drivers').pipe(take(1)).subscribe(e => {
      // console.log(e);
      for(let i = 0; i < e.length; i++) {
        if(e[i].passengers.includes(localStorage.getItem('userMail'))) {
          this.myDriver = e[i].mail;
          this.service.passMapSub = this.firestore.getCollectionById<iDriverData>('Drivers', this.myDriver).subscribe(resp => {
            // console.log(resp);
            this.driverData = resp;
            this.createRoute();
          });
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

  leaveTrip() {
    this.firestore.getCollectionById<iDriverData>('Drivers', this.driverData.mail).pipe(take(1)).subscribe(e => {
      const index = e.passengers.indexOf(localStorage.getItem('userMail'));
      e.passengers.splice(index, 1);
      this.service.passMapSub.unsubscribe();
      this.firestore.updateCollection('Drivers', this.driverData.mail, e);
      this.driverData = this.driverDataNull;
      this.directionsRenderer.setMap(null);
    });
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
    this.service.passWatch = this.geolocation.watchPosition().subscribe((e: any) => {  // current location
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
