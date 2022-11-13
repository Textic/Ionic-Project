import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { GlobalService } from './global.service';

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

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private zone: NgZone, private router: Router, private service: GlobalService) {
    this.deepLink();
  }

  deepLink() {
    App.addListener('appUrlOpen', (data: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const link = data.url;
        // remove https://textic.github.io/ from https://textic.github.io/deeplink/6969
        var path = link.replace('https://textic.github.io/', '');
        if (path) {
          this.service.presentAlert('Path', path);
          this.router.navigateByUrl(path);
        }
      });

    
      // console.log('App opened with URL: ' + data.url);
    });


  }
}
