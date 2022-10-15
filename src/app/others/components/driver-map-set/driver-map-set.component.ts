import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/global.service';
import { Http, HttpResponse } from '@capacitor-community/http';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-driver-map-set',
  templateUrl: './driver-map-set.component.html',
  styleUrls: ['./driver-map-set.component.scss'],
})

export class DriverMapSetComponent implements OnInit, AfterViewInit {
  
  constructor(private loadingCtrl: LoadingController, private service: GlobalService, private router: Router, private geolocation: Geolocation) { }
  
  @ViewChild('mapDriverSet') mapRef: ElementRef<HTMLElement>;
  map = null;
  marker: any;
  marketDuoc: any;
  loading: any;
  input = "";
  response: HttpResponse;

  lat: string
  lng: string
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.createMap();
  }

  ionViewDidEnter() {
    this.marketDuoc = new google.maps.Marker({
      position: {lat: -33.033648, lng: -71.5329167},
      map: this.map,
      title: 'Duoc UC',
      draggable: false,
      icon: {
        url: 'assets/img/duocucMarker.png',
        scaledSize: new google.maps.Size(50, 80)
      }
    });
  }

  async searchMap() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    await this.loading.present();
    if (this.input != "") {
      this.response = await Http.request({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.input + '&key=' + environment.googleMapsConfig.apiKey
      });
      if (this.response.data.status == "ZERO_RESULTS") { // check if the address is valid
        console.log("Error: ");
        console.log(this.response);
        this.loading.dismiss();
        this.service.presentToast("No Ubieron Resultados");
      } else if (this.response.status == 200) {  //    will pass if the status code is 200
        // console.log(this.response);
        if (this.marker) {  //    check if marker is already added
          this.marker.setMap(null);
        }
        this.map.setOptions({
          center: this.response.data.results[0].geometry.location
        })
        this.lat = this.response.data.results[0].geometry.location.lat; //save the latitude
        this.lng = this.response.data.results[0].geometry.location.lng; //save the longitude
        this.marker = new google.maps.Marker({  // set marker
          position: this.response.data.results[0].geometry.location,
          map: this.map,
          title: this.response.data.results[0].formatted_address,
          draggable: true
        });
        console.log(this.response.data.results[0].formatted_address);
        google.maps.event.addListener(this.marker, 'dragend', (event) => { // on drag listener to get the new coordinates of the marker and update the lat and lng variables
          this.lat = event.latLng.lat();
          this.lng = event.latLng.lng();
          // console.log(this.lat);
          // console.log(this.lng);
        });
        this.loading.dismiss();
      } else {   //                    any error
        console.log("Error: ");
        console.log(this.response);
        this.loading.dismiss();
        this.service.presentToast("Hubo un error");
      }
    } else {
      this.loading.dismiss();
      this.service.presentAlert('Error', 'Ingrese una dirección');
    }
  };

  test() {
    
  }

  async save() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    this.loading.present();
    console.log(this.lat);
    console.log(this.lng);
    if (this.lat && this.lng) {
      this.response = await Http.request({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lat + "," + this.lng + '&key=' + environment.googleMapsConfig.apiKey
      });
      // console.log(this.response);
      localStorage.setItem("TEMPdriverLocationName", this.response.data.results[0].formatted_address);
      localStorage.setItem("TEMPdriverLat", this.lat);
      localStorage.setItem("TEMPdriverLng", this.lng);
      this.loading.dismiss();
      this.router.navigate(['driver/driver-config']);
    } else {
      this.loading.dismiss();
      this.service.presentAlert('Error', 'Hubo un error al guardar la ubicación');
    }
  }

  async createMap() {
    this.map = new google.maps.Map(document.getElementById("mapDriverSet") as HTMLElement, {
      disableDefaultUI: true,
      clickableIcons: false,
      center: {
        lat: -33.033648,
        lng: -71.5329167
        },
      zoom: 15,
    });
    const geolocateControl = document.createElement("ion-button");    // make button to geolocate
    geolocateControl.appendChild(document.createElement("ion-icon"));
    geolocateControl.firstElementChild.setAttribute("name", "location");
    // geolocateControl.textContent = "Ubicación Actual";
    // geolocateControl.classList.add("custom-map-control-button");
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocateControl);
    geolocateControl.addEventListener("click", () => {               // geolocate function on click
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);
        this.lat = resp.coords.latitude.toString()     //save the latitude
        this.lng = resp.coords.longitude.toString()     //save the longitude
        this.map.setOptions({
          center: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          }
        })
        if (this.marker) {  //    check if marker is already added
          this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({  // set marker
          position: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          map: this.map,
          draggable: true
        });
        google.maps.event.addListener(this.marker, 'dragend', (event) => { // on drag listener to get the new coordinates of the marker and update the lat and lng variables
          this.lat = event.latLng.lat();
          this.lng = event.latLng.lng();
          // console.log(this.lat);
          // console.log(this.lng);
        });
      }).catch((error) => {
        this.service.presentAlert('Error', 'Hubo un error al obtener su ubicación');
        console.log('Error getting location', error);
      });
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