import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private applyUrl = environment.baseUrl + '/apply';
  private availableMentorsUrl = environment.baseUrl + '/availableMentors';
  private appliedMentorsUrl = environment.baseUrl + '/appliedMentors';
  private downloadResumeUrl = environment.baseUrl + '/downloadResume';
  private approveMentorUrl = environment.baseUrl + '/approveMentor';

  constructor(private _httpClient: HttpClient) { }

  apply(fullName: any, skills: any, experience: any, designation:any, languages:any, userId: any, resume: any) {
    const params = new HttpParams().set('fullName', fullName)
      .set('skills', skills)
      .set('experience', experience)
      .set('designation', designation)
      .set('languages', languages)
      .set('userId', userId);
    const resumeData = new FormData();
    resumeData.append("resume", resume);
    return this._httpClient.post<boolean>(this.applyUrl, resumeData, {params});
  }

  availableMentors() {
    return this._httpClient.get<User[]>(this.availableMentorsUrl);
  }

  appliedMentors() {
    return this._httpClient.get<User[]>(this.appliedMentorsUrl);
  }

  // @ts-ignore
  downloadResume(userId) {
    const params = new HttpParams()
      .set('userId', userId);
    // @ts-ignore
    return this._httpClient.get<any[]>(this.downloadResumeUrl, {params, responseType: 'blob' });
  }

  // @ts-ignore
  approveMentor(userId,rate) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('rate', rate);
    return this._httpClient.get<boolean[]>(this.approveMentorUrl, {params});
  }
}
