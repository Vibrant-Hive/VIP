import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../service/auth/auth-service.service";
import {Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  headerComponent: HeaderComponent = new HeaderComponent(this._authService, this._router, this.dialog, this._userService);

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public dialog: MatDialog,
    public _userService: UserService) {
  }

  ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  logout() {
    this.headerComponent.logout()
  }

  showLogin() {
    return !this.isAuthenticated;
  }

  showMentors() {
    return !this._router.url.includes('mentors');
  }

  showRoadmap() {
    return !this._router.url.includes('roadmap');
  }

  showApply() {
    return this.isAuthenticated && sessionStorage.getItem('role') != 'MENTOR' && sessionStorage.getItem('role') != 'MASTER';
  }


  showHome() {
    return !this._router.url.includes('home');
  }

  isMobile() {
    return sessionStorage.getItem('device') === 'mobile';
  }

  showProfile() {
    sessionStorage.setItem('selectedUserId', String(sessionStorage.getItem('userId')));
    sessionStorage.setItem('action', 'edit');
    this._router.navigateByUrl('/profile').then();
  }

  showCertificate() {
    return !this._router.url.includes('learner');
  }

  videoWidth() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "240";
    } else {
      return "1080";
    }
  }

  videoHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "144";
    } else {
      return "540";
    }
  }
}
