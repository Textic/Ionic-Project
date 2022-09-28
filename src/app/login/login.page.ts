import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../global.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  dataExtras: any = "";

  data = {
    mail: "",
    password: ""
  }

  firstname: string = 'John';
  user = "hole";

  void: String = "";

  constructor(private activeroute: ActivatedRoute, private service: GlobalService, private router: Router, private menuController: MenuController) {
    this.menuController.enable(false)
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataExtras = this.router.getCurrentNavigation().extras.state.data;
      } else {
        this.router.navigate(["/login"])}
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.menuController.enable(true)
  }

  send() {
    if (this.validateModel(this.data)) {
      if (this.data.mail == "admin" && this.data.password == "admin" || this.data.mail == "user" && this.data.password == "user") {
        this.service.presentToast("Sesion Iniciada con el email: " + this.data.mail);
        let navigationExtras: NavigationExtras = {
          state: {
            data: this.data
          }
        };
        localStorage.setItem('sessionStatus', "true")
        localStorage.setItem('mail', this.data.mail)
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
