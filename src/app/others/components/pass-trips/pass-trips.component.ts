import { Component, OnInit } from '@angular/core';
import { iTripData } from '../../interfaces/interface';

@Component({
  selector: 'app-pass-trips',
  templateUrl: './pass-trips.component.html',
  styleUrls: ['./pass-trips.component.scss'],
})
export class PassTripsComponent implements OnInit {

  constructor() { }

  tripData: iTripData

  trips: Array<any> = [
    { driver: 'Javier Espindola', capacity: '4', patent: '0812-8312-4596', value: '$4.000', time: '14:20', car: 'Nissan Skyline', status: 'Disponible', btncolor: 'success'},
    { driver: 'Daniel Gonzalez', capacity: '3', patent: '3581-3812-2048', value: '$2.000', time: '12:30', car: 'Ferrari', status: 'Disponible', btncolor: 'success'},
    { driver: 'Carlos Donoso', capacity: '1', patent: '8421-9491-8313', value: '$700', time: '17:30', car: 'Suzuki S-presso', status: 'No Disponible', btncolor: 'danger'},
  ];

  ngOnInit() {}

}
