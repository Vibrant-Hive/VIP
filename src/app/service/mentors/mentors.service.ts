import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

export interface SupportRequest {
  id: number;
  learnerId: number;
  mentorId: number;
  verified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MentorsService {

  private updateProfileUrl = environment.baseUrl + '/updateProfile';
  private availableMentorsUrl = environment.baseUrl + '/availableMentors';
  private downloadResumeUrl = environment.baseUrl + '/downloadResume';
  private getSupportRequestUrl = environment.baseUrl + '/getSupportRequest';
  private requestForSupportUrl = environment.baseUrl + '/requestForSupport';

  constructor(private _httpClient: HttpClient) {
  }

  updateProfile(fullName: any, skillSetId: any, role: any, active: any, experience: any, designation: any, languages: any, userId: any, zoomLink: any, availability: any, resume: any, photo: any) {
    const params = new HttpParams().set('fullName', fullName)
      .set('skillSetId', skillSetId)
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

  downloadResume(userId: any) {
    const params = new HttpParams()
      .set('userId', userId);
    // @ts-ignore
    return this._httpClient.get<any[]>(this.downloadResumeUrl, {params, responseType: 'blob', headers: this.httpHeaders});
  }

  getSupportRequest(learnerId: any, mentorId: any){
    const params = new HttpParams()
      .set('learnerId', learnerId)
      .set('mentorId', mentorId);
    return this._httpClient.get<SupportRequest>(this.getSupportRequestUrl, {params, headers: this.httpHeaders});
  }

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
  });

  requestForSupport(learnerId: any, mentorId: any) {
    const params = new HttpParams()
      .set('learnerId', learnerId)
      .set('mentorId', mentorId);
    return this._httpClient.get<SupportRequest>(this.requestForSupportUrl, {params, headers: this.httpHeaders});
  }
}
