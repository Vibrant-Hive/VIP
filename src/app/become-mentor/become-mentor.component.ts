import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {MentorsService} from "../service/mentors/mentors.service";

@Component({
  selector: 'app-become-mentor',
  templateUrl: './become-mentor.component.html',
  styleUrls: ['./become-mentor.component.css'],
  providers: [MessageService]
})
export class BecomeMentorComponent implements OnInit {
  fileName?: string;
  resume?: File;
  photoName?: string;
  photo?: File;
  fullName: any;
  skills: any;
  experience: any;
  designation: any;
  languages: any;
  applyMentorShow: boolean = false;
  underReview: boolean = false;


  constructor(private _mentorsService: MentorsService, private messageService: MessageService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("role") === 'MENTOR' && sessionStorage.getItem("active") === 'false') {
      this.underReview = true;
    } else {
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
      this._mentorsService.apply(this.fullName, this.skills, this.experience, this.designation, this.languages, userId, this.resume, this.photo).subscribe((isSuccess: any) => {
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

}
