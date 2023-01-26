import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("userId")) {
      this._router.navigateByUrl('/mentors').then();
    } else {
      this._router.navigateByUrl('/login').then();
    }

  }
}
