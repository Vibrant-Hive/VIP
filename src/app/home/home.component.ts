import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../service/auth/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  applyButtonText: any;
  imageObject: Array<object> = [{
    image: '../../assets/images/home/firstOfItskind.png',
  },
    {
      image: '../../assets/images/home/1to1.png',

    },
    {
      image: '../../assets/images/home/liveMentors.png',

    }
  ];

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
        this.applyButtonText = "Profile";
      } else {
        this.applyButtonText = "Apply as Mentor"
      }
      HomeComponent.setDevice();
      window.onresize = () => {
        HomeComponent.setDevice();
      }
    });
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
