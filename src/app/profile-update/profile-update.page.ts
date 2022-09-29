import { Component, OnInit } from '@angular/core';
import { iUserData } from '../others/interfaces/interface';
import { FirestoreService } from '../others/services/firestore.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  constructor(private firestore: FirestoreService) { }

  userData: iUserData[] = []

  NewUserData: iUserData = {
    name: "dadada",
    lName: "dadada",
    mail: "alo@gmail.com",
    number: "56948347298"
  }

  ngOnInit() {
    
  }
}
