import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanLoad {

  constructor(private firestore: FirestoreService) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('userId') == null) {
      this.firestore.getCollectionIdByParameter("Users", "mail", localStorage.getItem('mail'))
    }

    if (localStorage.getItem("theme") == "dark") {
      document.body.setAttribute("color-theme", "dark");
    } else {
      document.body.setAttribute("color-theme", "light");
    }

    return true;
  }
}
