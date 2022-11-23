import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { take } from 'rxjs/operators';
import { GlobalService } from 'src/app/global.service';
import { AlertController } from '@ionic/angular';
import { iDriverData } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pass-trips',
  templateUrl: './pass-trips.component.html',
  styleUrls: ['./pass-trips.component.scss'],
})
export class PassTripsComponent implements OnInit {

  constructor(private firestore: FirestoreService, private service: GlobalService, private alertController: AlertController, private router: Router, private http: HttpClient) { }

  tripsData: Array<any>;
  lsMail: string;
  loading: any;
  bool: boolean;

  data = {
    passengers: Array()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.loading = await this.loadingCtrl.create({
    //   message: 'Por favor espere...'
    // });
    // this.loading.present();
    this.refreshTripData();
    this.lsMail = localStorage.getItem('userMail');
    // this.loading.dismiss();
  }

  async getTrip(e) {
    // console.log(e.path.length);
    for (let i = 0; i < e.path.length; i++) {    //
      if (typeof e.path[i].id == 'string') {     //
        var mail = e.path[i].id;                //  Get the mail of the driver
        if (this.checkMail(mail)) {             //
          // console.log(mail);
          const alert = await this.alertController.create({
            header: '¿Desea solicitar viaje?',
            message: 'Se le enviará una notificación al conductor ' + mail,
            mode: 'ios',
            buttons: [
              {
                text: 'Cancelar',
                handler: () => {
                }
              },
              {
                text: 'Aceptar',
                handler: () => {
                  // this.requestTrip(mail, localStorage.getItem('userMail'));
                  this.sendMail(mail);
                }
              }
            ]
          });
          await alert.present();
          break;
        }
      }
    }
  }

  viewInMap(e) {
    for (let i = 0; i < e.path.length; i++) {    //
      if (typeof e.path[i].id == 'string') {     //
        var mail = e.path[i].id;                //  Get the mail of the driver
        if (this.checkMail(mail)) {             //
          this.firestore.getCollectionById<iDriverData>('Drivers', mail).pipe(take(1)).subscribe(e => {
            localStorage.setItem('TEMPpassMapViewLat', e.lat);
            localStorage.setItem('TEMPpassMapViewLng', e.lng);
            this.router.navigate(['passenger/pass-map-view']);
          });
        }
      }
    }
  }

  async sendMail(mail: string) {
    // window.open('mailto:' + mail + '?cc=' + localStorage.getItem("userMail") + '&subject=Soliciutd%20de%20viaje&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20viaje.%20Estos%20son%20mis%20datos%3A%0D%0A%0D%0ANombre%3A%20' + localStorage.getItem("userName") + ' ' + localStorage.getItem("userLName") + '%0D%0ACorreo%3A%20' + localStorage.getItem("userMail") + '%0D%0A%0D%0APresiona%20este%20link%20para%20agregarme%20a%20tu%20viaje: textic.github.io/'+ mail + '/' + localStorage.getItem("userMail"));
    this.http.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: "service_ea9m6hb",
      template_id: "template_exd0vyl",
      user_id: "h87C7zlJq9KKUZeFF",
      template_params: {
        dmail: mail,
        name: localStorage.getItem("userName") + ' ' + localStorage.getItem("userLName"),
        mail: localStorage.getItem("userMail")
      },
      accessToken: "MXv3_sbv-w9U82sNZxAA4"
    }).pipe(take(1)).subscribe();
  }

  requestTrip(driverMail: string, userMail: string) {
    this.data = {
      passengers: Array()
    }
    this.checkIfIAmPassenger();
    this.firestore.getCollectionById<iDriverData>('Drivers', driverMail).pipe(take(1)).subscribe(e => {
      // console.log(e);
      if(this.bool) {
        this.service.presentAlert('Usted ya esta en un viaje');
      } else {
        this.data.passengers = e.passengers;
        this.data.passengers.push(userMail);
        this.firestore.updateCollection('Drivers', driverMail, this.data);
        // this.refreshTripData();
      }
    })
  }

  checkIfIAmPassenger() {   // check if the user is already in a trip
    this.firestore.getCollection<iDriverData>('Drivers').pipe(take(1)).subscribe(e => {
      // console.log(e);
      for(let i = 0; i < e.length; i++) {
        // console.log(e[i].passengers);
        if(e[i].passengers.includes(localStorage.getItem('userMail'))) {
          this.bool = true;
          return
        }
      }
      this.bool = false;
      return
    });
  }

  checkSpace(capacity: string, passengers: Array<string>) {
    if (passengers.length < parseInt(capacity)) {
      return true;
    }
    // console.log('No hay espacio');
    return false;
  }

  checkMail(mail: string) {
    if (mail.includes("@") && mail.includes(".")) {
      return true;
    }
    return false;
  }


  doRefresh(event) {
    this.refreshTripData(event);
  }

  refreshTripData(event?) {
    this.firestore.getCollection('Drivers').pipe(take(1)).subscribe(e => {
      // for (let i = 0; i < e.length; i++) {
      //   if (this.checkSpace(e[i].capacity, e[i].passengers) && e[i].available == 'true') {
      //     this.tripsData.push(e[i]);
      //     console.log(e[i]);
      //   }
      // }
      this.tripsData = e;
      if (event) {
        event.target.complete();
      }
    });
  }

  // test() {
  //   const users = "dai.gonzalez@duocuc.cl/ja.espindola@duocuc.cl";
  //   var usersArray = users.split('/');
  //   if (usersArray.length > 2 || usersArray.length == 0) {
  //     this.service.presentAlert("Error", "Cantidad incorrecta de usuarios");
  //   } else if (usersArray[0] == localStorage.getItem('userMail')) {
  //     // this.service.presentAlert("passed");
  //     this.firestore.getCollection('Drivers').pipe(take(1)).subscribe((e: any) => {
  //       for(let i = 0; i < e.length; i++) {
  //         if(e[i].passengers.includes(usersArray[1])) {
  //           this.service.presentAlert("Error", "El usuario ya esta en un viaje");
  //           return
  //         }
  //       }
  //       this.firestore.getCollectionById('Drivers', localStorage.getItem("userMail")).pipe(take(1)).subscribe((e: any) => {
  //         this.data.passengers = e.passengers;
  //         this.data.passengers.push(usersArray[1]);
  //         this.firestore.updateCollection('Drivers', localStorage.getItem("userMail"), this.data);
  //         this.service.presentAlert("Agregado", "Se ha agregado a " + usersArray[1] + " como pasajero");
  //       })
  //     });
  //   } else {
  //     this.service.presentAlert("Error", "Hubo un error al procesar el enlace");
  //   }
  // };
}
