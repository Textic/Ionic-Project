import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public toastController: ToastController, private alertController: AlertController, private router: Router) { }

  lsMail = localStorage.getItem("mail");

  checkSesion() {
    if (localStorage.getItem("mail") == null || localStorage.getItem("mail") == "") {
      return false;
    } else {
      return true;
    }
  }

  async presentAlert(m1: any, m2?: any) {
    const alert = await this.alertController.create({
      header: m1,
      // subHeader: 'Important message',
      message: m2 ? m2: "",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(msg: string, duracion?: number) {// Copiado de la profe   `(*>﹏<*)′
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }

  clearLS() {
    var toggle = document.getElementById("toggle");
    toggle.setAttribute('checked', "false");
    localStorage.clear();
    this.router.navigateByUrl('splash');
  }
}
