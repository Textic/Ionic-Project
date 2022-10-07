import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { take } from 'rxjs/operators';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-pass-trips',
  templateUrl: './pass-trips.component.html',
  styleUrls: ['./pass-trips.component.scss'],
})
export class PassTripsComponent implements OnInit {

  constructor(private firestore: FirestoreService, private service: GlobalService) { }

  tripsData: any

  trips: Array<any> = [
    { driver: 'Javier Espindola', capacity: '4', patent: '0812-8312-4596', value: '$4.000', time: '14:20', car: 'Nissan Skyline', status: 'Disponible', btncolor: 'success'},
    { driver: 'Daniel Gonzalez', capacity: '3', patent: '3581-3812-2048', value: '$2.000', time: '12:30', car: 'Ferrari', status: 'Disponible', btncolor: 'success'},
    { driver: 'Carlos Donoso', capacity: '1', patent: '8421-9491-8313', value: '$700', time: '17:30', car: 'Suzuki S-presso', status: 'No Disponible', btncolor: 'danger'},
  ];

  ngOnInit() {
    this.firestore.getCollection('Drivers').pipe(take(1)).subscribe(e => {
      // console.log(e);
      this.tripsData = e;
    });
  }

  ionViewWillEnter() {

  }

  getTrip(e) {
    // console.log(e.path.length);
    for (let i = 0; i < e.path.length; i++) {
      if (typeof e.path[i].id == 'string') {
        var mail = e.path[i].id;
        if (this.checkMail(mail)) {
          // console.log(mail);
          this.service.presentAlert('Información del viaje', 'Mail del conductor: ' + mail);
          break;
        }
      }
    }
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
