import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs"; 
 import {AuthService} from "../service/auth/auth-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public isAuthenticated = false; 
   private _destroySub$ = new Subject<void>(); 
  
   constructor( 
     private _authService: AuthService, 
     private _router: Router) { 
   } 
  
   ngOnInit(): void { 
     this._authService.isAuthenticated$.pipe( 
       takeUntil(this._destroySub$) 
     ).subscribe((isAuthenticated: boolean) => { 
       this.isAuthenticated = isAuthenticated;
});
}


}
