import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string = 'http://localhost:8080/validateUser';

  constructor(private _httpClient: HttpClient) {
  }
  signInWithCredentials( email: string, password : string) {
    const params = new HttpParams().set('email', email).set('password', password);
    return this._httpClient.get(this.loginUrl, {params, responseType: "text"});
  }

  isLoggedIn(){
    return sessionStorage.getItem("email") !== null;
  }
}
