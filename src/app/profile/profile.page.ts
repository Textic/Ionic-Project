import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  lsMail = localStorage.getItem("userMail")
  lsName = localStorage.getItem("userName")
  lsLName = localStorage.getItem("userLName")
  lsNumber = localStorage.getItem("userNumber")

  ngOnInit() {
    if (this.lsNumber == null || this.lsNumber == "") {
      document.getElementById("number").innerHTML = "Sin Número"
    } else {
      document.getElementById("number").innerHTML = "+56 " + this.lsNumber
    }

    if (this.lsName == null || this.lsName == "") {
      document.getElementById("name").innerHTML = "Sin Nombre"
    } else {
      document.getElementById("name").innerHTML = this.lsName + " " + this.lsLName
    }
  }

  profileEdit() {
    this.router.navigateByUrl('profile-update', { replaceUrl: true });
    // this.router.navigate(['profile-update'], { replaceUrl: true });
  }

  clearSession() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
