import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class MentorsService {

  private updateProfileUrl = environment.baseUrl + '/updateProfile';
  private availableMentorsUrl = environment.baseUrl + '/availableMentors';
  private appliedMentorsUrl = environment.baseUrl + '/appliedMentors';
  private downloadResumeUrl = environment.baseUrl + '/downloadResume';
  private approveMentorUrl = environment.baseUrl + '/approveMentor';

  constructor(private _httpClient: HttpClient) {
  }

  updateProfile(fullName: any, skills: any, role: any, active: any, experience: any, designation: any, languages: any, userId: any, zoomLink: any, availability: any, resume: any, photo: any) {
    const params = new HttpParams().set('fullName', fullName)
      .set('skills', skills)
      .set('role', role)
      .set('active', active)
      .set('experience', experience)
      .set('designation', designation)
      .set('languages', languages)
      .set('zoomLink', zoomLink)
      .set('availability', availability)
      .set('userId', userId);
    const fileData = new FormData();
    if (resume instanceof File)
      fileData.append("resume", resume, resume.name);
    if (photo instanceof File)
      fileData.append("photo", photo, photo.name);
    return this._httpClient.post<boolean>(this.updateProfileUrl, fileData, {params: params, headers: this.httpHeaders});
  }

  availableMentors() {
    return this._httpClient.get<User[]>(this.availableMentorsUrl, {headers: this.httpHeaders});
  }

  appliedMentors() {
    return this._httpClient.get<User[]>(this.appliedMentorsUrl, {headers: this.httpHeaders});
  }

  // @ts-ignore
  downloadResume(userId) {
    const params = new HttpParams()
      .set('userId', userId);
    // @ts-ignore
    return this._httpClient.get<any[]>(this.downloadResumeUrl, {params, responseType: 'blob'});
  }

  // @ts-ignore
  approveMentor(userId, rate) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('rate', rate);
    return this._httpClient.get<boolean[]>(this.approveMentorUrl, {params});
  }

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
  });
}
