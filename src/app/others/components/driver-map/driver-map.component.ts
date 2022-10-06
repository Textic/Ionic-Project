import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

declare var google;

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.scss'],
})
export class DriverMapComponent implements OnInit, AfterViewInit {

  constructor(private service: GlobalService) { }

  @ViewChild('mapDriver') mapRef: ElementRef<HTMLElement>;
  map = null;
  marker: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  lsLat = Number(localStorage.getItem('driverLat'));
  lsLng = Number(localStorage.getItem('driverLng'));

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.createMap();
  }

  ngOnDestroy() {
    console.log("destroy");
  }

  ionViewDidEnter() {
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
        this.service.presentAlert("Error", "No se pudo calcular la ruta");
        console.log(response);
        console.log(status);
      }
    }, 2000);
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




  // loadMap() {
  //   const mapEle: HTMLElement = document.getElementById('mapDriver');
  //   const myLatLng = { lat: -33.033648, lng: -71.5329167 }; // 
  //   this.map = new google.maps.Map(mapEle, {
  //     center: myLatLng,
  //     zoom: 16
  //   });
  //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
  //     mapEle.classList.add('show-map');
  //     const marker = {
  //       position: {
  //         lat: -33.033648,
  //         lng: -71.5329167
  //       },
  //       title: 'Duoc UC'
  //     };
  //     this.addMarker(marker);
  //     // add route to marker
  //     const directionsService = new google.maps.DirectionsService();
  //     const directionsRenderer = new google.maps.DirectionsRenderer();
  //     directionsRenderer.setMap(this.map);
  //     // map settings
  //     this.map.setOptions({
  //       clickableIcons: false,
  //       disableDefaultUI: true,
  //       draggable: false,
  //       zoomControl: true,
  //         disableDoubleClickZoom: false,
  //         scrollwheel: true, 
  //         panControl: false,
  //         gestureHandling: 'auto',
  //         mapTypeId: 'roadmap',
  //         minZoom: 0,
  //         maxZoom: 22,
  //         backgroundColor: '#fff',
  //         restriction: {},
  //         controlSize: 28,
  //         tilt: 0,
  //         heading: 0,
  //         keyboardShortcuts: true,
  //         noClear: false,
  //         attributionControl: true,
  //         mapTypeControl: true,
  //         mapTypeControlOptions: {
  //           mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
  //           position: google.maps.ControlPosition.TOP_RIGHT,
  //           style: google.maps.MapTypeControlStyle.DEFAULT
  //         },
  //         fullscreenControl: true,
  //         fullscreenControlOptions: {
  //           position: google.maps.ControlPosition.RIGHT_BOTTOM
  //         },
  //         zoomControl: true,
  //         zoomControlOptions: {
  //           position: google.maps.ControlPosition.RIGHT_BOTTOM,
  //           style: google.maps.ZoomControlStyle.DEFAULT
  //         },
  //         scaleControl: true,
  //         scaleControlOptions: {
  //           position: google.maps.ControlPosition.RIGHT_BOTTOM,
  //           style: google.maps.ScaleControlStyle.DEFAULT
  //         },
  //         streetViewControl: true,
  //         streetViewControlOptions: {
  //           position: google.maps.ControlPosition.RIGHT_BOTTOM
  //         },
  //         rotateControl: true,
  //         rotateControlOptions: {
  //           position: google.maps.ControlPosition.RIGHT_BOTTOM
  //         },
  //         styles: [
  //           {
  //             featureType: 'poi',
  //             elementType: 'labels',
  //             stylers: [
  //               {
  //                 visibility: 'off'
  //               }
  //             ]
  //           }
  //         ]
  //     });
  //     directionsService.route({
  //       origin: { lat: -33.033648, lng: -71.5329167 },
  //       destination: { lat: -32.9590508, lng: -71.5212855 },
  //       travelMode: google.maps.TravelMode.DRIVING
  //     }, (response, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         directionsRenderer.setDirections(response);
  //       } else {
  //         window.alert('Directions request failed due to ' + status);
  //       }
  //     }
  //       , 2000);
  //   })
  // }

  // addMarker(marker) {
  //   return new google.maps.Marker({
  //     position: marker.position,
  //     map: this.map,
  //     title: marker.title
  //   });
  // }
}
