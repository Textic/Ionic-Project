import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalService } from '../global.service';

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

  constructor(private router: Router, public toastController: ToastController, private service: GlobalService) {}
  
  formForgot = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
  });
  
  ngOnInit() {
  }

  submit() {
    if (this.formForgot.valid) {
      let navigationExtras: NavigationExtras = {
        state: {
          data: this.data
        }
      };
      this.router.navigate(['/login'], navigationExtras);
      this.service.presentAlert("Datos Ingresados Correctamente!", "Revise su correo para recuperar su contraseña");
    } else {
      this.service.presentAlert("Datos Incorrectos", "Datos Invalidos o mal Ingresados.");
    }
  }
}

