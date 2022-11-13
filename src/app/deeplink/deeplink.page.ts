import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deeplink',
  templateUrl: './deeplink.page.html',
  styleUrls: ['./deeplink.page.scss'],
})
export class DeeplinkPage implements OnInit {
  id = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
