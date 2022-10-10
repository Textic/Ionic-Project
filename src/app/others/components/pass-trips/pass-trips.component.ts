import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { take } from 'rxjs/operators';
import { GlobalService } from 'src/app/global.service';
import { AlertController } from '@ionic/angular';
import { iDriverData } from '../../interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-trips',
  templateUrl: './pass-trips.component.html',
  styleUrls: ['./pass-trips.component.scss'],
})
export class PassTripsComponent implements OnInit {

  constructor(private firestore: FirestoreService, private service: GlobalService, private alertController: AlertController, private router: Router) { }

  tripsData: any
  lsMail: string;
  loading: any;
  bool: boolean;

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.loading = await this.loadingCtrl.create({
    //   message: 'Por favor espere...'
    // });
    // this.loading.present();
    this.firestore.getCollection('Drivers').pipe(take(1)).subscribe(e => {
      // console.log(e);
      this.tripsData = e;

    });
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
                handler: (blah) => {
                }
              }, {
                text: 'Aceptar',
                handler: () => {
                  this.requestTrip(mail, localStorage.getItem('userMail'));
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

  requestTrip(driverMail: string, userMail: string) {
    this.checkIfIAmPassenger();
    this.firestore.getCollectionById<iDriverData>('Drivers', driverMail).pipe(take(1)).subscribe(e => {
      // console.log(e);
      if(this.bool) {
        this.service.presentAlert('Usted ya esta en un viaje');
      } else {
        e.passengers.push(userMail);
        this.firestore.updateCollection('Drivers', driverMail, e);
        this.firestore.getCollection('Drivers').pipe(take(1)).subscribe(e => {
          // console.log(e);
          this.tripsData = e;
        });
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
    this.firestore.getCollection('Drivers').pipe(take(1)).subscribe(e => {
      // console.log(e);
      this.tripsData = e;
      
      event.target.complete();
    });
  }
}
