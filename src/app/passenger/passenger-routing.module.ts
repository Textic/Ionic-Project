import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassMapViewComponent } from '../others/components/pass-map-view/pass-map-view.component';
import { PassMapComponent } from '../others/components/pass-map/pass-map.component';
import { PassTripsComponent } from '../others/components/pass-trips/pass-trips.component';

import { PassengerPage } from './passenger.page';

const routes: Routes = [
  {
    path: '',
    component: PassengerPage,
    children: [
      {
        path: 'pass-trips',
        component: PassTripsComponent
      },
      {
        path: 'pass-map',
        component: PassMapComponent
      },
      {
        path: 'pass-map-view',
        component: PassMapViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengerPageRoutingModule {}
