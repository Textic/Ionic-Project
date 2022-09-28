import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  constructor(private menuController: MenuController) {
    this.menuController.enable(false)
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.menuController.enable(true)
  }
}
