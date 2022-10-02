import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassMapComponent } from '../others/components/pass-map/pass-map.component';
import { TripsComponent } from '../others/components/trips/trips.component';

import { PassengerPage } from './passenger.page';

const routes: Routes = [
  {
    path: '',
    component: PassengerPage,
    children: [
      {
        path: 'trips',
        component: TripsComponent
      },
      {
        path: 'pass-map',
        component: PassMapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengerPageRoutingModule {}
