import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengerPageRoutingModule } from './passenger-routing.module';

import { PassengerPage } from './passenger.page';
import { TripsComponent } from '../others/components/trips/trips.component';
import { PassMapComponent } from '../others/components/pass-map/pass-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengerPageRoutingModule
  ],
  declarations: [PassengerPage, TripsComponent, PassMapComponent]
})
export class PassengerPageModule {}
