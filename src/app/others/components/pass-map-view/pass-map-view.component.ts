import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

declare var google;

@Component({
  selector: 'app-pass-map-view',
  templateUrl: './pass-map-view.component.html',
  styleUrls: ['./pass-map-view.component.scss'],
})
export class PassMapViewComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private service: GlobalService) { }

  @ViewChild('mapPassView') mapRef: ElementRef<HTMLElement>;
  map = null;
  marker: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  ngOnInit() {}

  ngAfterViewInit() {
    this.createMap();
  }

  ionViewWillEnter() {
    this.createRoute();
  }

  back() {
    this.router.navigate(['passenger/pass-trips']);
  }

  createRoute() {
    this.directionsRenderer.setMap(null);
    this.directionsRenderer.setMap(this.map);
    this.directionsService.route({
      origin: { lat: -33.033648, lng: -71.5329167 },
      destination: { lat: Number(localStorage.getItem('TEMPpassMapViewLat')), lng: Number(localStorage.getItem('TEMPpassMapViewLng')) },
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
    this.map = new google.maps.Map(document.getElementById("mapPassView") as HTMLElement, {
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
