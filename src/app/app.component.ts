import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {UserService} from "./service/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  constructor(private _router: Router,
              private _http: HttpClient,
              public _gtmService: GoogleTagManagerService,
              public _userService: UserService) {
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('ip'))
      this.ipAddress();
  }

  ipAddress() {
    this._http.get<any>('https://geolocation-db.com/json/')
      .subscribe(response => {
        sessionStorage.setItem('ip', response.IPv4);
        sessionStorage.setItem('city', response.country_name + ' : ' + response.state + ' : ' + response.city);

        this._userService.registerUserEvent('new session').subscribe();

        this._router.events.forEach(item => {
          if (item instanceof NavigationEnd) {
            const gtmTag = {
              event: 'page',
              pageName: item.url
            };
            this._gtmService.pushTag(gtmTag);

            this._userService.registerUserEvent('page open : ' + item.url).subscribe();
          }
        });
      })
  }

  title = 'VIP';

  onActivate($event: any) {

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
}
