import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-driver-config',
  templateUrl: './driver-config.component.html',
  styleUrls: ['./driver-config.component.scss'],
})
export class DriverConfigComponent implements OnInit {

  constructor(private router: Router, private pickerCtrl: PickerController) { }

  data = {
    vehicle: localStorage.getItem('driverVehicle') ?? "",
    capacity: localStorage.getItem('driverCapacity') ?? "",
    patent: localStorage.getItem('driverPatent') ?? "",
    time: localStorage.getItem('driverTime') ?? "",
    locationName: localStorage.getItem('driverLocationName') ?? "",
    lat: localStorage.getItem('driverLat') ?? "",
    lng: localStorage.getItem('driverLng') ?? "",
  }

  ngOnInit() {

  }
  
  // fixTime(e: string){
  //   const currentTime = "0000-01-01T" + e + ":00-00:00";
  //   console.log(currentTime);
  //   return currentTime;
  // }

  ionViewWillEnter() {
    this.data.lat = localStorage.getItem('driverLat') ?? "";
    this.data.lng = localStorage.getItem('driverLng') ?? "";
    this.data.locationName = localStorage.getItem('driverLocationName') ?? "";
    console.log(this.data);
  }

  map() {
    this.router.navigate(['driver/driver-map-set']);
  }

  save() {
    
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'hour',
          options: [
            {
              text: '00',
              value: '00',
            },
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },
            {
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },
            {
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            },
            {
              text: '13',
              value: '13',
            },
            {
              text: '14',
              value: '14',
            },
            {
              text: '15',
              value: '15',
            },
            {
              text: '16',
              value: '16',
            },
            {
              text: '17',
              value: '17',
            },
            {
              text: '18',
              value: '18',
            },
            {
              text: '19',
              value: '19',
            },
            {
              text: '20',
              value: '20',
            },
            {
              text: '21',
              value: '21',
            },
            {
              text: '22',
              value: '22',
            },
            {
              text: '23',
              value: '23',
            },
          ]
        },
        {
          name: 'minute',
          options: [
            {
              text: '00',
              value: '00',
            },
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },
            {
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },
            {
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            },
            {
              text: '13',
              value: '13',
            },
            {
              text: '14',
              value: '14',
            },
            {
              text: '15',
              value: '15',
            },
            {
              text: '16',
              value: '16',
            },
            {
              text: '17',
              value: '17',
            },
            {
              text: '18',
              value: '18',
            },
            {
              text: '19',
              value: '19',
            },
            {
              text: '20',
              value: '20',
            },
            {
              text: '21',
              value: '21',
            },
            {
              text: '22',
              value: '22',
            },
            {
              text: '23',
              value: '23',
            },
            {
              text: '24',
              value: '24',
            },
            {
              text: '25',
              value: '25',
            },
            {
              text: '26',
              value: '26',
            },
            {
              text: '27',
              value: '27',
            },
            {
              text: '28',
              value: '28',
            },
            {
              text: '29',
              value: '29',
            },
            {
              text: '30',
              value: '30',
            },
            {
              text: '31',
              value: '31',
            },
            {
              text: '32',
              value: '32',
            },
            {
              text: '33',
              value: '33',
            },
            {
              text: '34',
              value: '34',
            },
            {
              text: '35',
              value: '35',
            },
            {
              text: '36',
              value: '36',
            },
            {
              text: '37',
              value: '37',
            },
            {
              text: '38',
              value: '38',
            },
            {
              text: '39',
              value: '39',
            },
            {
              text: '40',
              value: '40',
            },
            {
              text: '41',
              value: '41',
            },
            {
              text: '42',
              value: '42',
            },
            {
              text: '43',
              value: '43',
            },
            {
              text: '44',
              value: '44',
            },
            {
              text: '45',
              value: '45',
            },
            {
              text: '46',
              value: '46',
            },
            {
              text: '47',
              value: '47',
            },
            {
              text: '48',
              value: '48',
            },
            {
              text: '49',
              value: '49',
            },
            {
              text: '50',
              value: '50',
            },
            {
              text: '51',
              value: '51',
            },
            {
              text: '52',
              value: '52',
            },
            {
              text: '53',
              value: '53',
            },
            {
              text: '54',
              value: '54',
            },
            {
              text: '55',
              value: '55',
            },
            {
              text: '56',
              value: '56',
            },
            {
              text: '57',
              value: '57',
            },
            {
              text: '58',
              value: '58',
            },
            {
              text: '59',
              value: '59',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.data.time = value.hour.value + ':' + value.minute.value;
            // console.log(this.data.time);
          },
        },
      ],
    });

    await picker.present();
  }

  // getTime(date: string) {
  //   const time = date.substring(11, 16);
  //   console.log(time);
  //   return time;
  // }
}
