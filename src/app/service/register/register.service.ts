import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/User";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private createAccountUrl: string = environment.baseUrl + '/createAccount';

  constructor(private _httpClient: HttpClient) {
  }

  register( user: {email: string, mobileNo: string, password : string}) {
    return this._httpClient.post<User>(this.createAccountUrl, user, {headers: this.httpHeaders});
  }

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
  });
}
