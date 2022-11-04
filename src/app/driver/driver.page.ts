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
      console.log("Error: " + error);
    }
    this.service.driverMapSub.unsubscribe();
    this.service.driverWatch.unsubscribe();
    this.service.driverConfig.unsubscribe();
  }

  ionViewWilEnter() {

  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['driver/' + value]);
  }
}
