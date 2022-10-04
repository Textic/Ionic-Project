import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/global.service';
import { Http, HttpResponse } from '@capacitor-community/http';

declare var google;

@Component({
  selector: 'app-driver-map-set',
  templateUrl: './driver-map-set.component.html',
  styleUrls: ['./driver-map-set.component.scss'],
})

export class DriverMapSetComponent implements OnInit, AfterViewInit {
  
  constructor(private loadingCtrl: LoadingController, private service: GlobalService) { }
  
  @ViewChild('mapDriverSet') mapRef: ElementRef<HTMLElement>;
  map = null;    // previous code:          map: GoogleMap;
  marker: any;
  loading: any;
  input = "";
  response: HttpResponse;
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    if (localStorage.getItem('theme') !== 'dark') {
      this.map = new google.maps.Map(document.getElementById("mapDriverSet") as HTMLElement,
      {
        disableDefaultUI: true,
        center: {
          lat: -33.033648,
          lng: -71.5329167 
        },
        zoom: 15,
      });
    } else {
      this.map = new google.maps.Map(document.getElementById("mapDriverSet") as HTMLElement,
      {
        disableDefaultUI: true,
        center: { 
          lat: -33.033648,
          lng: -71.5329167 
        },
        zoom: 15,
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
        if (this.marker) {  //    check if marker is already added
          this.marker.setMap(null);
        }
        this.map.setOptions({
          center: this.response.data.results[0].geometry.location
        })
        // set marker
        this.marker = new google.maps.Marker({
          position: this.response.data.results[0].geometry.location,
          map: this.map,
          title: this.response.data.results[0].formatted_address
        });
        console.log(this.response.data.results[0].formatted_address);
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

  // async addMarker(latLong: [], title: string, draggable: boolean) {
  //   this.marker = await this.map.addMarker({
  //     coordinates: latLong,
  //     title: title,
  //     draggable: draggable
  //   });
  // }
}
