import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../others/services/firestore.service';
import { iUserData } from '../others/interfaces/interface';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData: iUserData[] = []

  // sub: Subscription

  makeUserData: iUserData = {
    name: "",
    lName: "",
    mail: "",
    number: ""
  }

  dataExtras = {
    mail: ""
  }

  data2 = {
    mail: ""
  }

  data = {
    mail: "",
    password: ""
  }

  img: string;
  void: String = "";

  constructor(private activeroute: ActivatedRoute, private service: GlobalService, private router: Router, private menuController: MenuController, private firestore: FirestoreService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataExtras = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    history.replaceState(null, null, location.href);
    this.menuController.enable(false)
  }

  ionViewWillEnter() {
    if (localStorage.getItem('theme') == "dark") {
      this.img = "assets/img/TELLEVO1_Back.png"
    } else {
      this.img = "assets/img/TELLEVO2_BLUR.png"
    }
  }

  ionViewWillLeave() {
    this.menuController.enable(true)
  }

  send() {
    this.makeUserData.mail = this.data.mail
    if (this.validateModel(this.data)) {
      if (this.data.mail == "dai.gonzalez@duocuc.cl" && this.data.password == "admin" || this.data.mail == "hola@gmail.com" && this.data.password == "admin" || this.data.mail == "lol@gmail.com" && this.data.password == "admin" || this.data.mail == "ja.espindola@duocuc.cl" && this.data.password == "admin") {
        this.service.presentToast("Sesion Iniciada con el email: " + this.data.mail);
        this.firestore.getCollectionByParameter<iUserData>("Users", "mail", this.data.mail).subscribe(e => {
          if (e.length == 0) {
            this.firestore.setCollection("Users", this.makeUserData.mail, this.makeUserData)
            localStorage.setItem('userMail', this.data.mail)
          }
          // console.log(e)
          this.userData = e
          this.userData.forEach(e => {
            if (e.mail) {
              localStorage.setItem('userMail', this.data.mail)
            }
            if (e.name) {
              localStorage.setItem('userName', e.name)
            }
            if (e.lName) {
              localStorage.setItem('userLName', e.lName)
            }
            if (e.number) {
              localStorage.setItem('userNumber', e.number)
            }
          })
        })
        localStorage.setItem('sessionStatus', "true")
        this.router.navigateByUrl('/home', { replaceUrl: true });
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
