import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../service/dashboard/dashboard.service";
import {User} from "../model/User";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fileName?: string;
  resume?: File;
  photoName?: string;
  photo?: File;
  fullName: any;
  skills: any;
  experience: any;
  underReview: boolean = false;
  appliedMentorsShow: boolean = false;
  applyMentorShow: boolean = false;
  availableMentorsShow: boolean = false;
  appliedMentors: User[] = [];
  displayedColumns: string[] = ['fullName', 'experience', 'skills', 'resume','rate', 'approve'];
  availableMentors: User[] = [];
  designation: any;
  languages: any;
  constructor(private _dashboardService: DashboardService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("role") === 'MENTOR' && sessionStorage.getItem("active") === 'false') {
      this.underReview = true;
    } else if (sessionStorage.getItem("role") === 'MASTER') {
      this.appliedMentorsShow = true;
      this._dashboardService.appliedMentors().subscribe(appliedMentors => {
        if (appliedMentors) {
          this.appliedMentors = appliedMentors;
        }
      });
    } else {
      this.availableMentorsShow = true;
      this._dashboardService.availableMentors().subscribe((availableMentors : User[]) => {
        if (availableMentors) {
          this.availableMentors = availableMentors;
        }
      });


      this.applyMentorShow = true;
    }
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    this.resume = $event.target.files[0];

    if (this.resume) {
      this.fileName = this.resume.name;
    }
  }

  onPhotoSelected($event: Event) {
      // @ts-ignore
      this.photo = $event.target.files[0];

      if (this.photo) {
        this.photoName = this.photo.name;
      }
    }

  apply() {
    let userId = sessionStorage.getItem('userId');
    if (this.resume && this.photo) {
      this._dashboardService.apply(this.fullName, this.skills, this.experience, this.designation, this.languages, userId, this.resume, this.photo).subscribe(isSuccess => {
        if (isSuccess) {
          alert('success');
        }
      });
    }
  }

  // @ts-ignore
  downloadResume(userId) {
    this._dashboardService.downloadResume(userId).subscribe(response => {
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      window.URL.createObjectURL(blob);
      //window.open(url);
      saveAs(blob, 'resume.docx');
    });
  }

  // @ts-ignore
  approveMentor(userId, rate) {
    this._dashboardService.approveMentor(userId, rate).subscribe(isSuccess => {
      if(isSuccess){
        alert(isSuccess);
      }
    })
  }
}
