import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../service/auth/auth-service.service";
import {NavigationEnd, Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  applyButtonText: any;
  private content: any = [];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public dialog: MatDialog,
    public _gtmService: GoogleTagManagerService) {
  }

  ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (sessionStorage.getItem('role') == 'MENTOR' || sessionStorage.getItem('role') == 'MASTER') {
        this.applyButtonText = "Profile";
      } else {
        this.applyButtonText = "Apply as Mentor"
      }
      HeaderComponent.setDevice();
      window.onresize = () => {
        HeaderComponent.setDevice();
      }
      this._router.events.forEach(item => {
        if (item instanceof NavigationEnd) {
          const gtmTag = {
            event: 'page',
            pageName: item.url
          };
          this._gtmService.pushTag(gtmTag);
        }
      });

    })
  }

  private static setDevice() {
    if (window.innerWidth <= 1000)
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
    return !this._router.url.includes('mentors');
  }

  showRoadmap() {
    return !this._router.url.includes('roadmap');
  }

  showApply() {
    return this.isAuthenticated && !this._router.url.includes('profile');
  }

  showHome() {
    return !this._router.url.includes('home');
  }

  showMenu() {
    return this.isMobile() && !this._router.url.includes('home');
  }

  showAccount() {
    return this.isMobile() && this._router.url.includes('home')
      && (sessionStorage.getItem('role') == 'MENTOR' || sessionStorage.getItem('role') == 'MASTER');
  }

  isMobile() {
    return sessionStorage.getItem('device') === 'mobile';
  }

  goToProfile() {
    sessionStorage.setItem('selectedUserId', String(sessionStorage.getItem('userId')));
    sessionStorage.setItem('action', 'edit');
    this._router.navigateByUrl('/profile').then();
  }

  showCertificate() {
    return !this._router.url.includes('learner');
  }

  showLetsVibe() {
    return this.isMobile() && this._router.url.includes('home') && !this.showAccount();
  }

  openDialog(): void {
    this.dialogData();
    this.dialog.open(DialogComponent, {data: {title: "\"One can master any skill, when there is a truly guiding mentor.\"", content: this.content}});
  }


  dialogData() {
    this.content = "";
    this.content = '<img src="../../assets/images/vibe/truth.jpg" alt="" height="420px" width="220px">';
  }
}
