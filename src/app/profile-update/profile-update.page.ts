import { Component, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { iUserData } from '../others/interfaces/interface';
import { FirestoreService } from '../others/services/firestore.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  constructor(private firestore: FirestoreService, private router: Router, private service: GlobalService) { }

  void: String = "";

  lsMail = localStorage.getItem('userMail');
  lsName = localStorage.getItem('userName');
  lsLName = localStorage.getItem('userLName');
  lsNumber = localStorage.getItem('userNumber');
  
  userData: iUserData = {
    mail: this.lsMail ?? "",
    name: this.lsName ?? "",
    lName: this.lsLName ?? "",
    number: this.lsNumber ?? ""
  }

  ngOnInit() {
    
  }

  updateProfile() {
    if (this.validateModel(this.userData)) {
      this.firestore.updateCollection("Users", this.userData.mail, this.userData) // Update user data in firestore
      localStorage.setItem('userMail', this.userData.mail)
      localStorage.setItem('userName', this.userData.name)
      localStorage.setItem('userLName', this.userData.lName)
      localStorage.setItem('userNumber', this.userData.number)
      this.router.navigateByUrl('/profile', { replaceUrl: true });
      // this.router.navigate(['profile'], { replaceUrl: true });
    } else {
      this.service.presentAlert("Falta informacion en el siguiente campo: ", this.void);
    }
  }

  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == "" || value == null) {
        if (key == "mail") {
          key = "Correo"
        }
        if (key == "name") {
          key = "Nombre"
        }
        if (key == "lName") {
          key = "Apellido"
        }
        if (key == "number") {
          key = "Numero"
        }
        this.void = key;
        return false;
      }
    }
    return true;
  }
}
