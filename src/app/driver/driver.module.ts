import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverPageRoutingModule } from './driver-routing.module';

import { DriverPage } from './driver.page';
import { DriverMapComponent } from '../others/components/driver-map/driver-map.component';
import { DriverConfigComponent } from '../others/components/driver-config/driver-config.component';
import { DriverMapSetComponent } from '../others/components/driver-map-set/driver-map-set.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverPageRoutingModule
  ],
  declarations: [DriverPage, DriverConfigComponent, DriverMapComponent, DriverMapSetComponent]
})
export class DriverPageModule {}
