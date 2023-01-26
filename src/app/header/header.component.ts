import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../service/auth/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  applyButtonText: any;

  constructor(
    private _authService: AuthService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (sessionStorage.getItem('role') == 'MENTOR' || sessionStorage.getItem('role') == 'MASTER') {
        this.applyButtonText = "Profile: " + sessionStorage.getItem('fullName')
      } else {
        this.applyButtonText = "Apply as Mentor"
      }
      HeaderComponent.setDevice();
      window.onresize = () => {
        HeaderComponent.setDevice();
      }
    })
  }

  private static setDevice() {
    if (window.innerWidth <= 500)
      sessionStorage.setItem('device', 'mobile');
    else
      sessionStorage.setItem('device', 'desktop');
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  logout() {
    sessionStorage.clear();
    this._authService.logout('/login')
  }

  showLogin() {
    return !this.isAuthenticated && !this._router.url.includes('login');
  }

  showMentors() {
    return this.isAuthenticated && !this._router.url.includes('mentors');
  }

  showApply() {
    return this.isAuthenticated && !this._router.url.includes('apply');
  }

  isMobile(){
    return sessionStorage.getItem('device') === 'mobile';
  }
}
