import { Component, NgZone } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { FirestoreService } from './others/services/firestore.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'grid' },
    { title: 'Configuraciones', url: '/config', icon: 'settings' },
    // { title: 'Mapa', url: '/map', icon: 'map' },
    // { title: 'Viajes', url: '/trips', icon: 'navigate-circle' },
  ];
  bool: boolean;
  data = {
    passengers: Array()
  }

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private zone: NgZone, private service: GlobalService, private alertController: AlertController, private firestore: FirestoreService, private http: HttpClient) {
    this.deepLink();
  }

  deepLink() {
    App.addListener('appUrlOpen', (data: URLOpenListenerEvent) => {
      this.zone.run(() => {
        this.presentAlertConfirm(data);
      });
    });
  }

  async presentAlertConfirm(data: URLOpenListenerEvent) {
    const alert = await this.alertController.create({
      header: 'Quiere agregar a este usuario de pasajero?',
      mode: 'ios',
      buttons: [
        {
        text: 'Cancelar',
        handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.addUserToPassengers(data);
          }
        }
      ]
    });

    await alert.present();
  };

  checkPassengers(user: string) {
    this.firestore.getCollection('Drivers').pipe(take(1)).subscribe((e: any) => {
      // console.log(e);
      for(let i = 0; i < e.length; i++) {
        // console.log(e[i].passengers);
        if(e[i].passengers.includes(user)) {
          this.bool = true;
          return
        }
      }
      this.bool = false;
      return
    });
  }

  addUserToPassengers(data: URLOpenListenerEvent) {
    const link = data.url;
    const users = link.replace('https://textic.github.io/', '');
    var usersArray = users.split('/');
    if (usersArray.length > 2 || usersArray.length == 0) {
      this.service.presentAlert("Error", "Cantidad incorrecta de usuarios");
    } else if (usersArray[0] == localStorage.getItem('userMail')) {
      this.firestore.getCollection('Drivers').pipe(take(1)).subscribe((e: any) => {
        for (let i = 0; i < e.length; i++) {
          if (e[i].passengers.includes(usersArray[1])) {
            this.service.presentAlert("Error", "El usuario ya esta en un viaje");
            return
          }
        }
        this.firestore.getCollectionById('Drivers', localStorage.getItem("userMail")).pipe(take(1)).subscribe((e: any) => {
          this.data.passengers = e.passengers;
          this.data.passengers.push(usersArray[1]);
          this.firestore.updateCollection('Drivers', localStorage.getItem("userMail"), this.data);
          this.service.presentAlert("Agregado", "Se ha agregado a " + usersArray[1] + " como pasajero");
          this.http.post('https://api.emailjs.com/api/v1.0/email/send', {
            service_id: "service_ea9m6hb",
            template_id: "template_wdrk48p",
            user_id: "h87C7zlJq9KKUZeFF",
            template_params: {
              pmail: usersArray[1],
              dname: localStorage.getItem('userName')
            },
            accessToken: "MXv3_sbv-w9U82sNZxAA4"
          }).pipe(take(1)).subscribe();
        })
      });
    } else {
      this.service.presentAlert("Error", "Hubo un error al procesar el enlace");
    }
  }

  // Por Favor revise la aplicacion para ver mas detalles sobre el viaje y el conductor

  closeSubscribers() {
    try {
      this.service.driverMapSub.unsubscribe();
      console.log("Service DriverMapSub Unsubscribed");
    } catch (error) {
      console.log("Service DriverMapSub not found");
    }
  
    try {
      this.service.driverWatch.unsubscribe();
      console.log("Service DriverWatch Unsubscribed");
    } catch (error) {
      console.log("Service DriverWatch not found");
    }
  
    try {
      this.service.driverConfig.unsubscribe();
      console.log("Service DriverConfig Unsubscribed");
    } catch (error) {
      console.log("Service DriverConfig not found");
    }
  
    try {
      this.service.passMapSub.unsubscribe();
      console.log("Service PassMapSub Unsubscribed");
    } catch (error) {
      console.log("Service PassMapSub not found");
    }
  
    try {
      this.service.passWatch.unsubscribe();
      console.log("Service PassWatch Unsubscribed");
    } catch (error) {
      console.log("Service PassWatch not found");
    }
  }
}
