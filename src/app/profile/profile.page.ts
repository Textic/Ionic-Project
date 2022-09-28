import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';

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
    this.router.navigateByUrl('login');
  }

  mail = localStorage.getItem("mail")
}
