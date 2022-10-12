import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  lsMail: string;
  lsName: string;
  lsLName: string;
  lsNumber: string;

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.lsMail = localStorage.getItem("userMail")
    this.lsName = localStorage.getItem("userName")
    this.lsLName = localStorage.getItem("userLName")
    this.lsNumber = localStorage.getItem("userNumber")

    const number = document.getElementById("number");
    if (this.lsNumber == null || this.lsNumber == "") {
      number.innerHTML = "Sin Número"
    } else {
      number.innerHTML = "+56 " + this.lsNumber
    }
  }

  profileEdit() {
    this.router.navigateByUrl('profile-update', { replaceUrl: true });
  }

  clearSession() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
