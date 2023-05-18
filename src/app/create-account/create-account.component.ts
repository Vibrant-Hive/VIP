import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../service/register/register.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {AuthService} from "../service/auth/auth-service.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  email: any;
  password: any;
  confirmPassword: any;
  mobileNoAlreadyExist: any;
  hide: boolean = true;
  mobileNo: any;
  emailAlreadyExist: any;

  constructor(private _registerService: RegisterService, private _router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.mobileNoAlreadyExist = false;
    this.emailAlreadyExist = false;
    this._registerService.register({mobileNo: this.mobileNo, password: this.password})
      .subscribe(user => {
        this._authService.login(this.mobileNo, this.password).pipe(
          take(1)
        ).subscribe({
          next: _ => {
            if (sessionStorage.getItem('redirectUrl')) {
              let redirect = sessionStorage.getItem('redirectUrl');
              sessionStorage.removeItem('redirectUrl');
              this._router.navigate([redirect]);
            } else
              this._router.navigate(['/home'])
          }
        });
      }, error => {
        if (error.error.message == "Mobile No Already Exists")
          this.mobileNoAlreadyExist = true;
        if (error.error.message == "Email Already Exists")
          this.emailAlreadyExist = true;
      },);
  }
}
