import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { iDriverData } from '../others/interfaces/interface';
import { FirestoreService } from '../others/services/firestore.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  constructor(private router: Router, private firestore: FirestoreService) { }

  lsMail = localStorage.getItem('userMail');


  ngOnInit() {
  }

  click() {
    const modal = document.querySelector('ion-modal');
    modal.isOpen = false;
  }

  ionViewWilEnter() {

  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['driver/' + value]);
  }
}
