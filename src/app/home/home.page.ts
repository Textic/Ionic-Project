import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private service: GlobalService, private router: Router) { }

  ngOnInit() {
  }

  onChangeSegment(e) {
    console.log("Segment Selection");
    let select = e.detail.value;
    this.router.navigate(['home/' + select]);
  }
}
