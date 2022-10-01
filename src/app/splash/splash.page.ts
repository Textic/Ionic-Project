import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  @ViewChild('squareA', { read: ElementRef, static: true }) squareA: ElementRef;
  
  constructor(public router: Router, private animationCtrl: AnimationController, public navCtrl: NavController) {
    setTimeout(() => {
      if (localStorage.getItem('sessionStatus') == "true") {
        this.router.navigateByUrl('home')
      } else {
        this.router.navigateByUrl('login')
      }
    },3500);
    setTimeout(() => {
      document.getElementById("loadingdiv").style.display = "block";
    },1500);
  }

  ngOnInit() {
    const squareA = this.animationCtrl.create()
      .addElement(this.squareA.nativeElement)
      .fill('none')
      .duration(7000)
      .keyframes([
        // { offset: 0, transform: 'rotate(0)' },
        { offset: 1, transform: 'rotate(1000deg)' }
      ]);

    squareA.play()
  }

}
