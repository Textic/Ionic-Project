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

  ngOnInit() {
    history.replaceState(null, null, location.href);
  }

  ionViewWillEnter() {
    
  }

  ionViewDidLeave() {
    document.getElementById("segment").setAttribute("value", "home");
  }

  onChangeSegment(e) {
    let select = e.detail.value;
    if (((localStorage.getItem("userName") == null || localStorage.getItem("userName") == "") && (localStorage.getItem("userLName") == null || localStorage.getItem("userLName") == "")) && select != "home") {
      this.service.presentToast("Nesesita proporcionar mas informacion en su cuenta.", 'middle', 1700)
      this.router.navigateByUrl('profile-update');
    } else if (select == "driver") {
      this.router.navigate(['driver/driver-config']);
    } else if (select == "passenger") {
      this.router.navigate(['passenger/pass-trips']);
    }
  }
}
