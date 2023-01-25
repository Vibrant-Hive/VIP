import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../model/User";
import {saveAs} from "file-saver";
import {MentorsService} from "../service/mentors/mentors.service";

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css']
})
export class MentorProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public mentor: User, private _mentorsService: MentorsService) { }

  ngOnInit(): void {
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
}
