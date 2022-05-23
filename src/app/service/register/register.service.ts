import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/User";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private createAccountUrl: string = environment.baseUrl + '/createAccount';

  constructor(private _httpClient: HttpClient) {
  }

  register( user: {email: string, password : string}) {
    return this._httpClient.post<User>(this.createAccountUrl, user);
  }
}
