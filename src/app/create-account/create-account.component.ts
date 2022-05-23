import { Component, OnInit } from '@angular/core';
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
  Roles: any = ['Mentor', 'Learner'];
  email: any;
  password: any;
  confirmPassword: any;
  alreadyExist: any;

  constructor(private _registerService: RegisterService, private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.alreadyExist = false;
    this._registerService.register({email: this.email, password: this.password})
      .subscribe(user => {
        if(user.id) {
          this._authService.login(this.email, this.password).pipe(
            take(1)
          ).subscribe({
            next: _ => {
              this._router.navigateByUrl('/dashboard').then();
            }
          });
        } else {
          this.alreadyExist = true;
        }
      });
  }
}
