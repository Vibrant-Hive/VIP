import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from "../login/login.service";
import {User} from "../../model/User";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(private _router: Router, private _authClient: LoginService) {
    this._authSub$.next(this._authClient.isLoggedIn());
  }

  public ngOnDestroy(): void {
    this._authSub$.next(false);
    this._authSub$.complete();
  }

  public login(userName: string, password: string): Observable<User> {
    return this._authClient.signInWithCredentials(userName, password).pipe(
       tap( user => {
         if(user.id) {
           sessionStorage.setItem('email', user.email);
           sessionStorage.setItem('fullName', user.fullName);
           sessionStorage.setItem('mobileNo', user.mobileNo);
           sessionStorage.setItem('userId', String(user.id));
           sessionStorage.setItem('role', user.role);
           sessionStorage.setItem('active', String(user.active));
           this._authSub$.next(true);
         }
       })
    );
  }

  public logout(redirect: string) {
    this._authSub$.next(false);
    this._router.navigate([redirect]).then()
  }

}
