import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverConfigComponent } from '../others/components/driver-config/driver-config.component';
import { DriverMapSetComponent } from '../others/components/driver-map-set/driver-map-set.component';
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
      },
      {
        path: 'driver-map-set',
        component: DriverMapSetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverPageRoutingModule {}
