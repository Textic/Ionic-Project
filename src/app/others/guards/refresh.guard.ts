import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanLoad {

  constructor() { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem("theme") == "dark") {
      document.body.setAttribute("color-theme", "dark");
    } else {
      document.body.setAttribute("color-theme", "light");
    }
    return true;
  }
}
