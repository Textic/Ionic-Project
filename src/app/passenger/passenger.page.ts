import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.page.html',
  styleUrls: ['./passenger.page.scss'],
})
export class PassengerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const modal = document.querySelector('ion-modal');
    // const searchBar = document.querySelector('ion-searchbar');

    modal.canDismiss = false;
    modal.isOpen = true;
    modal.breakpoints = [0.13, 0.5];
    modal.backdropBreakpoint = 0.3;
    modal.backdropDismiss = true;
    modal.showBackdrop = true;
    modal.initialBreakpoint = 0.13;

    // searchBar.addEventListener('click', e => {
    //   modal.setCurrentBreakpoint(1);
    // });
  }

  ionViewWillLeave() {
    const modal = document.querySelector('ion-modal');

    modal.canDismiss = true;
    modal.isOpen = false;
    console.log("passenger page will leave");
  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['passenger/' + value]);
  }
}
