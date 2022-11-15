import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.page.html',
  styleUrls: ['./passenger.page.scss'],
})
export class PassengerPage implements OnInit {

  constructor(private router: Router, private service: GlobalService) { }

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
      this.service.passMapSub.unsubscribe();
      console.log("Service PassMapSub Unsubscribed");
    } catch {
      console.log("Service PassMapSub not found");
    }

    try {
      this.service.passWatch.unsubscribe();
      console.log("Service PassWatch Unsubscribed");
    } catch {
      console.log("Service PassWatch not found");
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
    this.router.navigate(['passenger/' + value]);
  }
}
