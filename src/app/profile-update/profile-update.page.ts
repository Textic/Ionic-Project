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
  list: string[] = [];

  NewUserData: iUserData = {
    name: "Daniel",
    lName: "Gonzalez",
    mail: "hello@gmail.com",
    number: "56948347298"
  }

  ngOnInit() {
    console.log(this.firestore.getCollectionById("Users", "CTjq9XeqS5YdlQIzQgdr").subscribe(e => {
      console.log(e)
    }))
  }

}
