import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string = environment.baseUrl + '/validateUser';

  constructor(private _httpClient: HttpClient) {
  }
  signInWithCredentials( userName: string, password : string) {
    const params = new HttpParams().set('userName', userName).set('password', password);
    return this._httpClient.get<User>(this.loginUrl, {params, responseType: "json"});
  }

  isLoggedIn(){
    return sessionStorage.getItem("email") !== null;
  }
}
