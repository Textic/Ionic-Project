 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  mail: ""

  constructor(private router: Router, private service: GlobalService, private http: HttpClient) {}

  ngOnInit() {
  }

  submit() {
    this.http.get('https://nancyb3a.github.io/Test/usuarios_PGY4121_09.json').pipe(take(1)).subscribe((e: any) => {
      // console.log(e);
      for(let i = 0; i < e.alumnos.length; i++) {
        var username = e.alumnos[i].username;
        var userMail = this.mail.split('@duocuc.cl')[0];
        if (username == userMail) {
          var mail = username + "@duocuc.cl";
          // window.open("mailto:" + mail + "?body=Correo%20de%20restablecimiento%20de%20contrase%C3%B1a%20para%20usuario%20" + mail);
          this.service.presentAlert("Se ha enviado un correo a " + mail + " para restablecer su contraseña");
          this.router.navigate(['/login']);
          return;
        }
      }
      this.service.presentAlert("Error", "No se encontró el usuario");
    })
  }
}

