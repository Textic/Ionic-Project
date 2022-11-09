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
  mail: ""

  constructor(private router: Router, private service: GlobalService) {}

  ngOnInit() {
  }

  submit() {
    localStorage.setItem("extraMail", this.mail);
    this.router.navigate(['/login']);
    this.service.presentAlert("Datos Ingresados Correctamente!", "Revise su correo para recuperar su contraseña");
  }
}

