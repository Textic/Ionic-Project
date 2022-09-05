import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  trips: Array<any> = [
    { driver: 'Javier Espindola', capacity: '4', patent: '0812-8312-4596', value: '$4.000', time: '14:20', car: 'Nissan Skyline', status: 'Disponible'},
    { driver: 'Daniel Gonzalez', capacity: '3', patent: '3581-3812-2048', value: '$2.000', time: '12:30', car: 'Ferrari', status: 'Disponible'},
    { driver: 'Carlos Donoso', capacity: '1', patent: '8421-9491-8313', value: '$700', time: '17:30', car: 'Suzuki S-presso', status: 'No Disponible'},
  ];

  constructor() { }
  
  ngOnInit() {
  }

}
