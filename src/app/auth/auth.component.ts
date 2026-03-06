import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      authObs = this.authService.login(email, password)
      // .subscribe(resData => {
      //   this.isLoading = false;
      // }, errorMessage => {
      //   this.error = errorMessage;
      //   this.isLoading = false;
      // })
    } else {
      authObs = this.authService.signUp(email, password)
      // .subscribe(resData => {
      //   console.log(resData);
      //   this.isLoading = false;
      // }, errorMessage => {
      //   // console.log(errorRes);
      //   // switch (errorRes.error.error.message) {
      //   //   case 'EMAIL_EXISTS':
      //   //     this.error = 'This email exists already';
      //   // }
      //   this.error = errorMessage;
      //   this.isLoading = false;
      // });
    }

    authObs.subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })

    form.reset();
  }
}
