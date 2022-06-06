import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorised(route);
  }
  private isAuthorised(route: ActivatedRouteSnapshot): boolean {
    let currentRole = sessionStorage.getItem('currentRole');
    const expectedRoles = route.data.expectedRoles;
    let roleMatches = 0;
    expectedRoles.forEach(element => {
      if (element == currentRole) {
        roleMatches++;
      }
    });
    // const roleMatches = this.roles.findIndex(role => expectedRoles.indexOf(role) !== -1);
    return roleMatches <= 0 ? false : true;
  }
}
