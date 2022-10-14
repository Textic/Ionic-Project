import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { LoadingController, MenuController } from '@ionic/angular';
import { FirestoreService } from '../others/services/firestore.service';
import { iDriverData, iUserData } from '../others/interfaces/interface';
import { take } from 'rxjs/operators';
import { Http, HttpResponse } from '@capacitor-community/http'
import { LoginService } from '../others/services/login.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  response: HttpResponse;

  makeDriverData: iDriverData = {
    vehicle: "",
    capacity: "",
    patent: "",
    time: "",
    locationName: "",
    lName: "",
    lat: "",
    lng: "",
    mail: "",
    name: "",
    value: "",
    available: "false",
    passengers: [],
  }

  makeUserData: iUserData = {
    name: "",
    lName: "",
    mail: "",
    number: ""
  }

  dataExtras = {
    mail: ""
  }

  data2 = {
    mail: ""
  }

  data = {
    mail: "",
    password: ""
  }

  loginCheckData = {
    mail: "",
    name: "",
  }

  loginData: any

  loading: any;
  boolean: boolean;
  img: string;
  void: String = "";

  constructor(private activeroute: ActivatedRoute, private service: GlobalService, private router: Router, private menuController: MenuController, private firestore: FirestoreService, private loadingCtrl: LoadingController, private login: LoginService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataExtras = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    history.replaceState(null, null, location.href);
    this.menuController.enable(false)
  }

  ionViewWillEnter() {
    if (localStorage.getItem('theme') == "dark") {
      this.img = "assets/img/TELLEVO1_Back.png"
    } else {
      this.img = "assets/img/TELLEVO2_BLUR.png"
    }
  }

  ionViewDidEnter() {
    // this.loginData = {
    //   mail: "",
    //   name: "",
    //   boolean: false
    // }
  }

  ionViewWillLeave() {
    this.menuController.enable(true)
  }

  async send() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    this.makeUserData.mail = this.data.mail
    if (this.validateModel(this.data)) {
      this.response = await Http.request({
        method: 'GET',
        url: 'https://nancyb3a.github.io/Test/usuarios_PGY4121_09.json'
      });
      await this.loading.present();
      // this.loginCheck(this.data.mail, this.data.password, this.response.data.alumnos)
      this.loginData = this.login.loginCheck(this.data.mail, this.data.password, this.response.data.alumnos)
      if (this.loginData.__zone_symbol__value.boolean == true) {
        this.loginCheckData = {
          mail: this.loginData.__zone_symbol__value.mail,
          name: this.loginData.__zone_symbol__value.name,
        }
        this.firestore.getCollectionById<iUserData>("Users", this.loginCheckData.mail).pipe(take(1)).subscribe(async e => {
          if (!e) {
            this.makeUserData.name = this.loginCheckData.name.substring(0, this.loginCheckData.name.indexOf(" "));
            this.makeUserData.lName = this.loginCheckData.name.substring(this.loginCheckData.name.indexOf(" ") + 1);
            this.makeUserData.mail = this.loginCheckData.mail;
            this.firestore.setCollection("Users", this.loginCheckData.mail, this.makeUserData)
            localStorage.setItem('userMail', this.loginCheckData.mail)
            localStorage.setItem('userName', this.loginCheckData.name.substring(0, this.loginCheckData.name.indexOf(" ")))
            localStorage.setItem('userLName', this.loginCheckData.name.substring(this.loginCheckData.name.indexOf(" ") + 1))
          }
          if (e.mail) {
            localStorage.setItem('userMail', e.mail)
          }
          if (e.name) {
            localStorage.setItem('userName', e.name)
          }
          if (e.lName) {
            localStorage.setItem('userLName', e.lName)
          }
          if (e.number) {
            localStorage.setItem('userNumber', e.number)
          }
          await this.loading.dismiss();
          this.router.navigate(['/home']);
          this.service.presentToast("Sesion Iniciada con el email: " + this.data.mail);
        })
        this.firestore.getCollectionById<iDriverData>("Drivers", this.loginCheckData.mail).pipe(take(1)).subscribe(e => {
          if (!e) {
            this.firestore.setCollection("Drivers", this.loginCheckData.mail, this.makeDriverData)
          }
          if (e.vehicle) {
            localStorage.setItem('driverVehicle', e.vehicle)
          }
          if (e.capacity) {
            localStorage.setItem('driverCapacity', e.capacity)
          }
          if (e.patent) {
            localStorage.setItem('driverPatent', e.patent)
          }
          if (e.time) {
            localStorage.setItem('driverTime', e.time)
          }
          if (e.locationName) {
            localStorage.setItem('driverLocationName', e.locationName)
          }
          if (e.name) {
            localStorage.setItem('driverName', e.name)
          }
          if (e.lName) {
            localStorage.setItem('driverLName', e.lName)
          }
          if (e.mail) {
            localStorage.setItem('driverMail', e.mail)
          }
          if (e.lat) {
            localStorage.setItem('driverLat', e.lat)
          }
          if (e.lng) {
            localStorage.setItem('driverLng', e.lng)
          }
          if (e.value) {
            localStorage.setItem('driverValue', e.value)
          }
          if (e.available) {
            localStorage.setItem('driverAvailable', e.available)
          }
          if (e.passengers) {
            localStorage.setItem('driverPassengers', JSON.stringify(e.passengers))
          }
        });
        localStorage.setItem('sessionStatus', "true")
      } else {
        await this.loading.dismiss();
        this.service.presentAlert("Usuario Incorrecto!");
      }
    } else {
      await this.loading.dismiss();
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
