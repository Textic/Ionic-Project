import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clearSession() {
    localStorage.removeItem("sessionStatus");
    localStorage.removeItem("mail");
    localStorage.removeItem("name");
    localStorage.removeItem("lName");
    localStorage.removeItem("number");
    this.router.navigateByUrl('login');
  }

  mail = localStorage.getItem("mail")
  name = localStorage.getItem("name")
  lName = localStorage.getItem("lName")
  number = localStorage.getItem("number")
}
