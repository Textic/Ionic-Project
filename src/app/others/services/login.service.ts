import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data = {
    mail: "",
    name: "",
    boolean: false
  }

  constructor(private http: HttpClient) { }

  loginCheck(): Observable<any> {
    return this.http.get('https://nancyb3a.github.io/Test/usuarios_PGY4121_09.json');
  }

  // async loginCheck(mail: string, pass: string, data: any): Promise<any> {                        // Old loginCheck
  //   const length = data.length;
  //   for (let i = 0; i < length; i++) {
  //     var username = data[i].username;
  //     // remove @duocuc.cl from mail
  //     var userMail = mail.split('@duocuc.cl')[0];
  //     if (username == userMail && data[i].password == pass) {
  //       if (mail.includes("@duocuc.cl")) {
  //         this.data.mail = mail;
  //       } else {
  //         this.data.mail = mail + "@duocuc.cl"
  //       }
  //       this.data.name = data[i].nombre;
  //       this.data.boolean = true;
  //       return this.data;
  //     }
  //   }
  //   console.log("No se encontró el usuario");
  //   this.data.mail = "";
  //   this.data.name = "";
  //   this.data.boolean = false;
  //   return this.data;
  // }
}
