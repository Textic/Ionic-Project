import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const modal = document.querySelector('ion-modal');

    modal.canDismiss = false;
    modal.isOpen = true;
    modal.breakpoints = [0.13, 0.5];
    modal.backdropBreakpoint = 0.3;
    modal.backdropDismiss = true;
    modal.showBackdrop = true;
    modal.initialBreakpoint = 0.13;
  }

  ionViewWillLeave() {
    const modal = document.querySelector('ion-modal');

    modal.canDismiss = true;
    modal.isOpen = false;
  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['driver/' + value]);
  }
}
