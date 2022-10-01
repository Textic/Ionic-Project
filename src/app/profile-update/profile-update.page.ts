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
    if (this.validateModel(this.userData)) {
      this.firestore.updateCollection("Users", this.userData.mail, this.userData)
      localStorage.setItem('mail', this.userData.mail)
      localStorage.setItem('name', this.userData.name)
      localStorage.setItem('lName', this.userData.lName)
      localStorage.setItem('number', this.userData.number)
      this.router.navigateByUrl('/profile', { skipLocationChange: true, replaceUrl: true });
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
