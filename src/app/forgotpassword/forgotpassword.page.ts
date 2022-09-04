import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  data = {
    mail: ""
  }

  void: String = "";

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  send() {
    if (this.validateModel(this.data)) {
      this.presentToast("Revise su correo para poder recuperar la cuenta", 4500);
      let navigationExtras: NavigationExtras = {
        state: {
          data: this.data
        }
      };
      this.router.navigate(['/login'], navigationExtras);
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
