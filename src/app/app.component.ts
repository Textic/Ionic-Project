import { Component } from '@angular/core';
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

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private service: GlobalService) { }

}
