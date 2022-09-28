import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DriverComponent } from '../components/driver/driver.component';
import { PassengerComponent } from '../components/passenger/passenger.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, DriverComponent, PassengerComponent, HomeComponent]
})
export class HomePageModule {}
