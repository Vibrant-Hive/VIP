import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../model/User";
import {saveAs} from "file-saver";
import {MentorsService} from "../service/mentors/mentors.service";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css']
})
export class MentorProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public mentor: User, private _mentorsService: MentorsService, private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUser(this.mentor.id).subscribe((user: User) => {
      this.mentor = user;
      this.mentor.photo = 'data:image/png;base64,' + this.mentor.photo;
    });
  }

  // @ts-ignore
  downloadResume() {
      const byteArray = new Uint8Array(atob(this.mentor.resume).split('').map(char => char.charCodeAt(0)));
      let blob: any = new Blob([byteArray], {type: this.mentor.resumeFileType });
      window.URL.createObjectURL(blob);
      //window.open(url);
      saveAs(blob, this.mentor.resumeFileName);
  }
}
