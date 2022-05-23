import { Component, OnInit } from '@angular/core';
import {filter, Subject, take, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public email = '';
  public password = '';

  private _destroySub$ = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      filter((isAuthenticated: boolean) => isAuthenticated),
      takeUntil(this._destroySub$)
    ).subscribe( _ => this._router.navigate(['/home']));
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    this.loginValid = true;

    this._authService.login(this.email, this.password).pipe(
      take(1)
    ).subscribe({
      next: userId => {
        if(userId) {
          this.loginValid = true;
          this._router.navigateByUrl('/dashboard').then();
        } else {
          this.loginValid = false
        }
      },
      error: _ => this.loginValid = false
    });
  }
}
