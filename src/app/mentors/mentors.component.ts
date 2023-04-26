import {Component, OnInit} from '@angular/core';
import {MentorsService} from "../service/mentors/mentors.service";
import {User} from "../model/User";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

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


  constructor(private _mentorsService: MentorsService, private _router: Router, private messageService: MessageService) {
  }

  ngOnInit() {

    this._mentorsService.availableMentors().subscribe((availableMentors: User[]) => {
      if (availableMentors) {
        MentorsComponent.preparePhoto(availableMentors);
        this.availableMentors = availableMentors;
      }

      if (sessionStorage.getItem("role") === 'MASTER') {
        this._mentorsService.appliedMentors().subscribe((appliedMentors: User[]) => {
          if (appliedMentors.length > 0) {
            this.appliedMentorsShow = true;
            MentorsComponent.preparePhoto(appliedMentors);
            this.appliedMentors = appliedMentors;
          }
        });
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
      if (mentor.skills?.includes("FULL STACK") || mentor.skills?.includes("TESTING") || mentor.skills?.includes("SQL")
          || mentor.skills?.includes("ANDROID") || mentor.skills?.includes("PYTHON")) {
        mentor.displayPic = "../../assets/images/skills/"+ mentor.skills.toLowerCase().replace(' ', '') +".png"
      } else {
        mentor.displayPic = "../../assets/images/skills/"+ mentor.skills.toLowerCase().replace(' ', '') +".svg"
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
    sessionStorage.setItem('currentUserId', String(user.id));
    sessionStorage.setItem('action', 'book');
    this._router.navigateByUrl('/profile').then();
  }

  rowHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "5:4";
    } else {
      return "1:1";
    }
  }
}
