import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    var toggle = document.getElementById("toggle");
    if (localStorage.getItem("theme") == "dark") {
      toggle.setAttribute('checked', "true")
    }
  }

  toggleTheme(event) {
    if(event.detail.checked) {
      document.body.setAttribute("color-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.setAttribute("color-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }
}
