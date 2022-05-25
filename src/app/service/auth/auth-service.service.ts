import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from "../login/login.service";


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

  public login(email: string, password: string): Observable<Object> {
    return this._authClient.signInWithCredentials(email, password).pipe(
       tap( user => {
         if(user) {
           this._authSub$.next(true);
           // @ts-ignore
           sessionStorage.setItem('email', user.email);
           // @ts-ignore
           sessionStorage.setItem('userId', user.id);
           // @ts-ignore
           sessionStorage.setItem('role', user.role);
           // @ts-ignore
           sessionStorage.setItem('active', user.active);
         }
       })
    );
  }

  public logout(redirect: string) {
    this._authSub$.next(false);
    this._router.navigate([redirect]).then()
  }

}
