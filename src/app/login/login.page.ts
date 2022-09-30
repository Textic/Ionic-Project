import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../global.service';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../others/services/firestore.service';
import { iUserData } from '../others/interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData: iUserData[] = []

  makeUserData: iUserData = {
    name: "",
    lName: "",
    mail: "",
    number: ""
  }

  dataExtras = {
    mail: ""
  };

  data2 = {
    mail: ""
  }

  data = {
    mail: "",
    password: ""
  }

  void: String = "";

  constructor(private activeroute: ActivatedRoute, private service: GlobalService, private router: Router, private menuController: MenuController, private firestore: FirestoreService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataExtras = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    this.menuController.enable(false)
  }

  ionViewWillLeave() {
    this.menuController.enable(true)
  }

  send() {
    this.makeUserData.mail = this.data.mail
    if (this.validateModel(this.data)) {
      if (this.data.mail == "admin" && this.data.password == "admin" || this.data.mail == "dai.gonzalez@duocuc.cl" && this.data.password == "admin" || this.data.mail == "holahola@gmail.com" && this.data.password == "admin") {
        this.service.presentToast("Sesion Iniciada con el email: " + this.data.mail);
        let navigationExtras: NavigationExtras = {
          state: {
            data: this.data
          }
        };
        this.firestore.getCollectionByParameter<iUserData>("Users", "mail", this.data.mail).subscribe(e => {
          if (e.length == 0) {
            this.firestore.setCollection("Users", this.makeUserData.mail, this.makeUserData)
            localStorage.setItem('mail', this.data.mail)
          }
          this.userData = e
          this.userData.forEach(e => {
            if (e.mail) {
              localStorage.setItem('mail', this.data.mail)
            }
            if (e.name) {
              localStorage.setItem('name', e.name)
            }
            if (e.lName) {
              localStorage.setItem('lName', e.lName)
            }
            if (e.number) {
              localStorage.setItem('number', e.number)
            }
          })
        })
        localStorage.setItem('sessionStatus', "true")
        this.router.navigate(['/home/home'], navigationExtras);
      } else {
        this.service.presentAlert("Usuario Incorrecto!");
      }
    } else {
      this.service.presentAlert("Falta informacion en los siguientes campos: ", this.void);
    }
  }

  validateModel(model: any) { // Copiado de la profe   `(*>﹏<*)′
    // Recorrer todas las entradas que me entrega el Object entries y obtengo su clave-valor
    for (var [key, value] of Object.entries(model)) {
      // Si el value está vacio retorno falso y guardo el nombre del campo para el error
      if (value == "") {
        this.void = key;
        return false;
      }
    }
    return true;
  }
}
