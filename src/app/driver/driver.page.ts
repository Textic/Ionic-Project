import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { FirestoreService } from '../others/services/firestore.service';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  constructor(private router: Router, private firestore: FirestoreService, private service: GlobalService) { }

  lsMail = localStorage.getItem('userMail');


  ngOnInit() {
  }

  click() {
    const modal = document.querySelector('ion-modal');
    try {
      modal.isOpen = false;
    } catch (error) {
      console.log("Modal doesn't exist");
    }

    try {
      this.service.driverMapSub.unsubscribe();
      console.log("Service DriverMapSub Unsubscribed");
    } catch (error) {
      console.log("Service DriverMapSub not found");
    }

    try {
      this.service.driverWatch.unsubscribe();
      console.log("Service DriverWatch Unsubscribed");
    } catch (error) {
      console.log("Service DriverWatch not found");
    }
    
    try {
      this.service.driverConfig.unsubscribe();
      console.log("Service DriverConfig Unsubscribed");
    } catch (error) {
      console.log("Service DriverConfig not found");
    }
  }

  click2() {
    const modal = document.querySelector('ion-modal');
    try {
      modal.isOpen = false;
    } catch (error) {
      console.log("Modal doesn't exist");
    }

    this.router.navigate(['profile']);
  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['driver/' + value]);
  }
}
