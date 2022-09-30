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
    if (localStorage.getItem("theme") == "dark") {
      document.body.setAttribute("color-theme", "dark");
    } else {
      document.body.setAttribute("color-theme", "light");
    }
  }

  onChangeSegment(e) {
    /*console.log("Segment Selection");*/
    let select = e.detail.value;
    this.router.navigate(['home/' + select]);
  }
}
