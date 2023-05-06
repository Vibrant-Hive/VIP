import {Component, OnInit} from '@angular/core';
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
  public userName = '';
  public password = '';
  hide = true;

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
    ).subscribe(_ => {
      if (sessionStorage.getItem('redirectUrl'))
        this._router.navigate([sessionStorage.getItem('redirectUrl')])
      else
        this._router.navigate(['/home'])
    });
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    this.loginValid = true;

    this._authService.login(this.userName, this.password).pipe(
      take(1)
    ).subscribe({
      next: (user) => {
        if (user.id) {
          this.loginValid = true;
          if (sessionStorage.getItem('redirectUrl'))
            this._router.navigate([sessionStorage.getItem('redirectUrl')])
          else
            this._router.navigate(['/home'])
        } else {
          this.loginValid = false;
        }
      },
      error: _ => this.loginValid = false
    });
  }
}
