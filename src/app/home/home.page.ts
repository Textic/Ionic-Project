import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { FirestoreService } from '../others/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private service: GlobalService, private router: Router, private firestore: FirestoreService) { }

  lsName = localStorage.getItem("userName")
  lsLName = localStorage.getItem("userLName")

  ngOnInit() {
    history.replaceState(null, null, location.href);
  }

  ionViewDidLeave() {
    document.getElementById("segment").setAttribute("value", "home");
  }

  onChangeSegment(e) {
    let select = e.detail.value;
    if (select == "driver") {
      this.router.navigateByUrl('driver/driver-config');
    } else if (select == "passenger") {
      this.router.navigateByUrl('passenger/pass-trips');
    }
  }
}
