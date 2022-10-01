import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  lsMail = localStorage.getItem("mail")
  lsName = localStorage.getItem("name")
  lsLName = localStorage.getItem("lName")
  lsNumber = localStorage.getItem("number")

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
    this.router.navigateByUrl('profile-update', { skipLocationChange: true, replaceUrl: true });
  }

  clearSession() {
    localStorage.removeItem("sessionStatus");
    localStorage.removeItem("mail");
    localStorage.removeItem("name");
    localStorage.removeItem("lName");
    localStorage.removeItem("number");
    this.router.navigateByUrl('login');
  }
}
