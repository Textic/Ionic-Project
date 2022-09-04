import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  send() {
    if (this.validateModel(this.data)) {
      this.presentToast("Sesion Iniciada con el email: " + this.data.mail);
      let navigationExtras: NavigationExtras = {
        state: {
          data: this.data
        }
      };
      localStorage.setItem('data', JSON.stringify(this.data))
      this.router.navigate(['/home'], navigationExtras);
    } else {
      this.presentToast("Falta informacion en los siguientes campos: "+this.void, 4500);
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

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }
}
