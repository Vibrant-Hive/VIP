import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../service/dashboard/dashboard.service";
import {User} from "../model/User";
import {saveAs} from 'file-saver';
import {MatDialog} from "@angular/material/dialog";
import {MentorProfileComponent} from "../mentor-profile/mentor-profile.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
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
  displayedColumns: string[] = ['fullName', 'experience', 'skills', 'resume', 'rate', 'approve'];
  availableMentors: User[] = [];
  designation: any;
  languages: any;

  constructor(private _dashboardService: DashboardService, public dialog: MatDialog, private messageService: MessageService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("role") === 'MENTOR' && sessionStorage.getItem("active") === 'false') {
      this.underReview = true;
    } else if (sessionStorage.getItem("role") === 'MASTER') {
      this.appliedMentorsShow = true;
      this._dashboardService.appliedMentors().subscribe(appliedMentors => {
        if (appliedMentors) {
          DashboardComponent.preparePhoto(appliedMentors);
          this.appliedMentors = appliedMentors;
        }
      });
    } else {
      this.availableMentorsShow = true;
      this._dashboardService.availableMentors().subscribe((availableMentors: User[]) => {
        if (availableMentors) {
          DashboardComponent.preparePhoto(availableMentors);
          this.availableMentors = availableMentors;
        }
      });

      this.applyMentorShow = true;
    }
  }

  private static preparePhoto(mentors: User[]) {
    mentors.forEach(mentor => {
      mentor.photo = 'data:image/png;base64,' + mentor.photo;
      if (mentor.skills?.toLowerCase().includes("full stack")) {
        mentor.displayPic = "../../assets/images/full-stack.png"
      } else if (mentor.skills?.toLowerCase().includes("selenium")) {
        mentor.displayPic = "../../assets/images/selenium.svg"
      } else if (mentor.skills?.toLowerCase().includes("java")) {
        mentor.displayPic = "../../assets/images/java.svg"
      } else if (mentor.skills?.toLowerCase().includes("sql")) {
        mentor.displayPic = "../../assets/images/sql.png"
      } else {
        mentor.displayPic = "../../assets/images/coder.svg"
      }
    });
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
          this.messageService.add({
            severity: 'success',
            summary: 'Applied Successfully!',
            life: 3000,
          });
        }
      });
    }
  }

  // @ts-ignore
  downloadResume(userId) {
    this._dashboardService.downloadResume(userId).subscribe(response => {
      let blob: any = new Blob([response], {type: 'text/json; charset=utf-8'});
      window.URL.createObjectURL(blob);
      //window.open(url);
      saveAs(blob, 'resume.docx');
    });
  }

  // @ts-ignore
  approveMentor(userId, rate) {
    this._dashboardService.approveMentor(userId, rate).subscribe(isSuccess => {
      if (isSuccess) {
        this.messageService.add({
          severity: 'success',
          summary: 'Mentor Approved Successfully!',
          life: 3000,
        });
      }
    })
  }

  viewMentor(user: User) {
    this.dialog.open(MentorProfileComponent, {
      data: user,
      height: '85%',
      width: '70%',
    });
  }
}
