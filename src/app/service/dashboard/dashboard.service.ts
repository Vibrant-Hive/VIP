import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private applyUrl = environment.baseUrl + '/apply';

  constructor(private _httpClient: HttpClient) { }

  apply(fullName: any, skills: any, experience: any, userId: any, resume: any) {
    const params = new HttpParams().set('fullName', fullName).set('skills', skills)
      .set('experience', experience).set('userId', userId);
    const resumeData = new FormData();
    resumeData.append("resume", resume);
    return this._httpClient.post<boolean>(this.applyUrl, resumeData, {params});
  }
}
