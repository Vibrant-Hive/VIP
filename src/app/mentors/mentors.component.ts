import {Component, OnInit} from '@angular/core';
import {MentorsService} from "../service/mentors/mentors.service";
import {User} from "../model/User";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css'],
  providers: [MessageService]
})


export class MentorsComponent implements OnInit {

  availableMentors: User[] = [];

  constructor(private _mentorsService: MentorsService,
              private _router: Router,
              private messageService: MessageService,
              public _gtmService: GoogleTagManagerService,
              public _userService: UserService) {
  }

  ngOnInit() {

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
      if (mentor.skillSet.skillSetName?.includes("FULL STACK") || mentor.skillSet.skillSetName?.includes("TESTING") || mentor.skillSet.skillSetName?.includes("SQL")
        || mentor.skillSet.skillSetName?.includes("ANDROID") || mentor.skillSet.skillSetName?.includes("PYTHON")) {
        mentor.displayPic = "../../assets/images/skills/" + mentor.skillSet.skillSetName.toLowerCase().replace(' ', '') + ".png"
      } else {
        mentor.displayPic = "../../assets/images/skills/" + mentor.skillSet.skillSetName.toLowerCase().replace(' ', '') + ".svg"
      }
    });
  }

  viewMentor(user: User) {
    this.mentorEvent(user);
    sessionStorage.setItem('selectedUserId', String(user.id));
    sessionStorage.setItem('action', 'book');
    this._router.navigateByUrl('/profile').then();
  }

  rowHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "1:1";
    } else {
      return "1:1";
    }
  }

  isMobile() {
    return sessionStorage.getItem('device') === 'mobile';
  }

  mentorEvent(user: User) {
    // push GTM data layer with a custom event
    const gtmTag = {
      event: user.fullName + '-click',
      data: 'mentor-click-event',
    };
    this._gtmService.pushTag(gtmTag);

    this._userService.registerUserEvent('mentor tap : ' + user.fullName).subscribe();
  }
}
