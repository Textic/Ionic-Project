import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from '../components/driver/driver.component';
import { HomeComponent } from '../components/home/home.component';
import { PassengerComponent } from '../components/passenger/passenger.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'driver',
        component: DriverComponent
      },
      {
        path: 'passenger',
        component: PassengerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
