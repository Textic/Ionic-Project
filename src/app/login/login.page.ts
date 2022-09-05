import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data = {
    mail: "",
    password: ""
  }

  void: String = "";

  constructor(private service: GlobalService, private router: Router) { }

  ngOnInit() {
  }

  send() {
    if (this.validateModel(this.data)) {
      if (this.data.mail == "admin" && this.data.password == "admin") {
        this.service.presentToast("Sesion Iniciada con el email: " + this.data.mail);
        let navigationExtras: NavigationExtras = {
          state: {
            data: this.data
          }
        };
        localStorage.setItem('mail', this.data.mail)
        localStorage.setItem('password', this.data.password)
        this.router.navigate(['/home'], navigationExtras);
      } else {
        this.service.presentAlert("Usuario Incorrecto!");
      }
    } else {
      this.service.presentAlert("Falta informacion en los siguientes campos: ", this.void);
    }
  }

  // async presentAlert(m1: any, m2?: any) {
  //   const alert = await this.alertController.create({
  //     header: m1,
  //     // subHeader: 'Important message',
  //     message: m2 ? m2: "",
  //     buttons: ['OK'],
  //   });

  //   await alert.present();
  // }

  checkSesion() {
    if (localStorage.getItem("mail") == null || localStorage.getItem("mail") == "") {
      return false;
    } else {
      return true;
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
