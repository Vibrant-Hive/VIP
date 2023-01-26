import {Component, OnInit} from '@angular/core';
import {MentorsService} from "../service/mentors/mentors.service";
import {User} from "../model/User";
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
  appliedMentors: User[] = [];
  displayedColumns: string[] = ['fullName', 'experience', 'skills', 'resume', 'rate', 'approve'];
  availableMentors: User[] = [];


  constructor(private _mentorsService: MentorsService, public dialog: MatDialog, private messageService: MessageService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("role") === 'MASTER') {
      this._mentorsService.appliedMentors().subscribe((appliedMentors: User[]) => {
        if (appliedMentors.length > 0) {
          this.appliedMentorsShow = true;
          MentorsComponent.preparePhoto(appliedMentors);
          this.appliedMentors = appliedMentors;
        }
      });
    }
    this._mentorsService.availableMentors().subscribe((availableMentors: User[]) => {
      if (availableMentors) {
        MentorsComponent.preparePhoto(availableMentors);
        this.availableMentors = availableMentors;
      }
    });
  }

  gridCols(): number {
    if (sessionStorage.getItem('device') === 'mobile') {
      return 1;
    } else {
      return 4;
    }
  }

  private static preparePhoto(mentors: User[]) {
    mentors.forEach(mentor => {
      if (mentor.skills?.toLowerCase().includes("fullstack") || mentor.skills?.toLowerCase().includes("tester") || mentor.skills?.toLowerCase().includes("sql")) {
        mentor.displayPic = "../../assets/images/skills/"+ mentor.skills.toLowerCase() +".png"
      } else {
        mentor.displayPic = "../../assets/images/skills/"+ mentor.skills.toLowerCase() +".svg"
      }
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
        this.ngOnInit();
      }
    })
  }

  viewMentor(user: User) {
    this.dialog.open(MentorProfileComponent, {
      data: user,
      height: '90%',
      width: '70%',
    });
  }
}