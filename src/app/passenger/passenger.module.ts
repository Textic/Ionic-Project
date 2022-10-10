import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengerPageRoutingModule } from './passenger-routing.module';

import { PassengerPage } from './passenger.page';
import { PassMapComponent } from '../others/components/pass-map/pass-map.component';
import { PassTripsComponent } from '../others/components/pass-trips/pass-trips.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengerPageRoutingModule
  ],
  declarations: [PassengerPage, PassTripsComponent, PassMapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PassengerPageModule {}
