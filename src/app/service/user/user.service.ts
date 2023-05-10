import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

export interface UserEvent {
  userId: number;
  city: string;
  ipAddress: string;
  eventName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserUrl: string = environment.baseUrl + '/getUser';
  private registerUserEventUrl: string = environment.baseUrl + '/registerUserEvent';

  constructor(private _httpClient: HttpClient) {
  }

  getUser(userId: any) {
    const params = new HttpParams()
      .set('userId', userId);
    return this._httpClient.get<User>(this.getUserUrl, {params, headers: this.httpHeaders});
  }

  registerUserEvent(event : string){
    const userEvent = {
      userId: parseInt(sessionStorage.getItem('userId') + ''),
      ipAddress: sessionStorage.getItem('ip') + '',
      city: sessionStorage.getItem('city') + '',
      eventName: event,
    }
    return this._httpClient.post<User>(this.registerUserEventUrl, userEvent, {headers: this.httpHeaders});
  }

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
  });
}
