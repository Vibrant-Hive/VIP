import {Component, OnInit} from '@angular/core';
import {MentorsService} from "../service/mentors/mentors.service";
import {User} from "../model/User";
import {saveAs} from 'file-saver';
import {MatDialog} from "@angular/material/dialog";
import {MentorProfileComponent} from "../mentor-profile/mentor-profile.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css'],
  providers: [MessageService]
})


export class MentorsComponent implements OnInit {

  appliedMentorsShow: boolean = false;
  availableMentorsShow: boolean = false;
  appliedMentors: User[] = [];
  displayedColumns: string[] = ['fullName', 'experience', 'skills', 'resume', 'rate', 'approve'];
  availableMentors: User[] = [];


  constructor(private _mentorsService: MentorsService, public dialog: MatDialog, private messageService: MessageService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("role") === 'MASTER') {
      this.appliedMentorsShow = true;
      this._mentorsService.appliedMentors().subscribe((appliedMentors: User[]) => {
        if (appliedMentors) {
          MentorsComponent.preparePhoto(appliedMentors);
          this.appliedMentors = appliedMentors;
        }
      });
    } else {
      this.availableMentorsShow = true;
      this._mentorsService.availableMentors().subscribe((availableMentors: User[]) => {
        if (availableMentors) {
          MentorsComponent.preparePhoto(availableMentors);
          this.availableMentors = availableMentors;
        }
      });
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




  // @ts-ignore
  downloadResume(userId) {
    this._mentorsService.downloadResume(userId).subscribe((response: BlobPart) => {
      let blob: any = new Blob([response], {type: 'text/json; charset=utf-8'});
      window.URL.createObjectURL(blob);
      //window.open(url);
      saveAs(blob, 'resume.docx');
    });
  }

  // @ts-ignore
  approveMentor(userId, rate) {
    this._mentorsService.approveMentor(userId, rate).subscribe((isSuccess: any) => {
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
