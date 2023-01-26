import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserUrl: string = environment.baseUrl + '/getUser';

  constructor(private _httpClient: HttpClient) { }

  getUser(userId: any) {
    const params = new HttpParams()
      .set('userId', userId);
    return this._httpClient.get<User>(this.getUserUrl, {params});
  }
}
