import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverConfigComponent } from '../others/components/driver-config/driver-config.component';
import { DriverMapComponent } from '../others/components/driver-map/driver-map.component';

import { DriverPage } from './driver.page';

const routes: Routes = [
  {
    path: '',
    component: DriverPage,
    children: [
      {
        path: 'driver-config',
        component: DriverConfigComponent
      },
      {
        path: 'driver-map',
        component: DriverMapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverPageRoutingModule {}
