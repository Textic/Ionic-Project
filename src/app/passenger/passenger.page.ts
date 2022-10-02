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
    
  }

  onChangeSegment($event){
    let value = $event.detail.value;
    this.router.navigate(['passenger/' + value]);
  }
}
