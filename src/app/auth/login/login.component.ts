import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map, catchError, finalize, shareReplay } from "rxjs/operators";
import { throwError } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private apiService: ApiService,) { }
  public searchText: any;
  public loginForm: FormGroup | any;
  public getdata: any;
  public roleOfCurrentUser: any;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  get fc() { return this.loginForm.controls; }
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    let payLoad = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    const ob$ = this.apiService
      .getRoleOfCurrentUser(payLoad)
      .pipe(shareReplay(),
        catchError((error) => {
          console.log('LOCAL ERROR: ', error);
          return throwError(error);
        }),
        finalize(() => console.log('THE END'))
      )
    ob$.subscribe((data) => {
      this.getdata = data;
      this.roleOfCurrentUser = this.getdata.role;
      sessionStorage.setItem('currentRole', this.roleOfCurrentUser);
      console.log('HTTP RESPONSE: ', this.roleOfCurrentUser)
    },
      (error) => console.log('HTTP ERROR', error),
      () => console.log('HTTP IS DONE'));
    ob$.subscribe((data) => {
      this.getdata = data;
      this.roleOfCurrentUser = this.getdata.role;
      sessionStorage.setItem('currentRole', this.roleOfCurrentUser);
      console.log('HTTP RESPONSE: ', this.roleOfCurrentUser)
    },
      (error) => console.log('HTTP ERROR', error),
      () => console.log('HTTP IS DONE'));
  }
}
