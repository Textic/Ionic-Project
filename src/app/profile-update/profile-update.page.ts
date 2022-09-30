import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iUserData } from '../others/interfaces/interface';
import { FirestoreService } from '../others/services/firestore.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  constructor(private firestore: FirestoreService, private router: Router) { }

  lsMail = localStorage.getItem('mail');
  lsName = localStorage.getItem('name');
  lsLName = localStorage.getItem('lName');
  lsNumber = localStorage.getItem('number');
  
  userData: iUserData = {
    mail: this.lsMail ?? "",
    name: this.lsName ?? "",
    lName: this.lsLName ?? "",
    number: this.lsNumber ?? ""
  }
  
  ngOnInit() {
    
  }

  updateProfile() {
    this.firestore.updateCollection("Users", localStorage.getItem("userId"), this.userData)
    localStorage.setItem('mail', this.userData.mail)
    localStorage.setItem('name', this.userData.name)
    localStorage.setItem('lName', this.userData.lName)
    localStorage.setItem('number', this.userData.number)
    this.router.navigate(['/home/home']);
  }
}
