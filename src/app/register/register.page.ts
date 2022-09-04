import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data = {
    name: "",
    lastname: "",
    mail: "",
    password: ""
  }

  void: String = "";

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  send() {
    if (this.validateModel(this.data)) {
      this.presentToast("Registrado Correctamente");
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
