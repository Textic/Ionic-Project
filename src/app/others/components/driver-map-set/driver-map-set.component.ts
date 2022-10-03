import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { Geocoder, GeocoderResult, GoogleMap, Marker } from '@ionic-native/google-maps';
import { GoogleMap, MapType, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

declare var google;

@Component({
  selector: 'app-driver-map-set',
  templateUrl: './driver-map-set.component.html',
  styleUrls: ['./driver-map-set.component.scss'],
})

export class DriverMapSetComponent implements OnInit, AfterViewInit {
  
  constructor(public loadingCtrl: LoadingController) { }
  @ViewChild('mapDriverSet') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  map = null;
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'mapDriverSet',     // anything you want - meo corte, como le pongo al ingles
      element: this.mapRef.nativeElement,
      apiKey: environment.googleMapsConfig.apiKey,
      config: {
        center: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
      }
    });
    const map = new google.maps.Map(
      document.getElementById("mapDriverSet") as HTMLElement,
      {
        disableDefaultUI: true,
        center: { lat: 40.674, lng: -73.945 },
        zoom: 12,
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
      }
    );
  }
}
