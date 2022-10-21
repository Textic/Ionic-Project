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
      console.log("Error: " + error);
    }
    this.service.passMapSub.unsubscribe();
    this.service.passWatch.unsubscribe();
  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['passenger/' + value]);
  }
}
