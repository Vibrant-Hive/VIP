import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserUrl: string = environment.baseUrl + '/getUser';

  constructor(private _httpClient: HttpClient) {
  }

  getUser(userId: any) {
    const params = new HttpParams()
      .set('userId', userId);
    return this._httpClient.get<User>(this.getUserUrl, {params, headers: this.httpHeaders});
  }

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
  });
}
