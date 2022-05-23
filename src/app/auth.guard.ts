import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "./service/auth/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this._authService.isAuthenticated$
      .pipe(
        map((s: boolean) => s ? true: this._router.parseUrl('/login'))
      );
  }

}
