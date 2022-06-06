import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) { }
  
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      password: authData.password
    };
    this.authSuccessfully();
  }
  
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }
  
  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/home']);
  }
  
    // registerUser(authData: AuthData) {
    //   this.user = {
    //     email: authData.email,
    //     userId: Math.round(Math.random() * 10000).toString()
    //   };
    //   this.authSuccessfully();
    // }
}
