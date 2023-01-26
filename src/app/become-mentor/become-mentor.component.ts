import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {MentorsService} from "../service/mentors/mentors.service";
import {UserService} from "../service/user/user.service";
import {User} from "../model/User";
import {saveAs} from "file-saver";

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-become-mentor',
  templateUrl: './become-mentor.component.html',
  styleUrls: ['./become-mentor.component.css'],
  providers: [MessageService]
})
export class BecomeMentorComponent implements OnInit {
  fileName?: string;
  resume?: any;
  photo?: any;
  photoName?: any;
  photoDP: any;
  fullName: any;
  skills: any;
  experience: any;
  designation: any;
  languages: any;
  yourProfileShow: boolean = false;
  underReview: boolean = false;
  zoomLink: any;
  availability: any;
  availabilityOptions: Option[] = [
    {value: 'morning', viewValue: 'Morning'},
    {value: 'afternoon', viewValue: 'Afternoon'},
    {value: 'evening', viewValue: 'Evening'},
    {value: 'night', viewValue: 'Night'},
  ];
  languageOptions: Option[] = [
    {value: 'english', viewValue: 'English'},
    {value: 'tamil', viewValue: 'Tamil'},
    {value: 'hindi', viewValue: 'Hindi'},
    {value: 'urdu', viewValue: 'Urdu'},
    {value: 'telugu', viewValue: 'Telugu'},
    {value: 'malayalam', viewValue: 'Malayalam'},
    {value: 'french', viewValue: 'French'},
    {value: 'kannada', viewValue: 'Kannada'},
  ];
  applyButtonText: any;
  active?: boolean;
  role?: any;
  resumeFileName: any;
  resumeFileType: any;
  resumeDL: any;
  skillOptions: Option[] = [
    {value: 'fullstack', viewValue: 'Full Stack'},
    {value: 'sql', viewValue: 'SQL'},
    {value: 'java', viewValue: 'Java-Backend'},
    {value: 'angular', viewValue: 'Angular-UI'},
    {value: 'selenium', viewValue: 'Selenium-Automation'},
    {value: 'tester', viewValue: 'Testing-Manual'},
  ];

  constructor(private _mentorsService: MentorsService, private messageService: MessageService, private _userService: UserService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("role") === 'MENTOR' && sessionStorage.getItem("active") === 'false') {
      this.underReview = true;
    } else {
      this.yourProfileShow = true;
    }
    this._userService.getUser(sessionStorage.getItem('userId')).subscribe((user: User) => {
      this.fullName = user.fullName;
      this.availability = user.availability?user.availability.split(','):'';
      this.zoomLink = user.zoomLink;
      this.resume = user.resume;
      this.resumeDL = this.resume;
      this.photo = user.photo;
      this.photoName = user.photoFileName;
      this.photoDP = 'data:image/png;base64,' + user.photo;
      this.skills = user.skills;
      this.designation = user.designation;
      this.experience = user.experience;
      this.languages = user.languages?user.languages.split(','):'';
      this.active = user.active;
      this.role = user.role;
      this.resumeFileName = user.resumeFileName;
      this.resumeFileType = user.resumeFileType;
      this.fileName = this.resumeFileName;

      if(!this.role){
        this.active = false;
        this.role = "MENTOR";
        this.applyButtonText = "Apply as Mentor"
      } else {
        this.applyButtonText = "Save Profile"
      }
    });
  }

  gridCols(): number {
    if (sessionStorage.getItem('device') === 'mobile') {
      return 1;
    } else {
      return 3;
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
      let reader = new FileReader();
      reader.readAsDataURL(this.photo);

      reader.onload = (_event) => {
        this.photoDP = reader.result;
        this.photoName = this.photo.name;
      }
    }
  }

  updateProfile() {
    let userId = sessionStorage.getItem('userId');
    this._mentorsService.updateProfile(this.fullName, this.skills, this.role, this.active, this.experience, this.designation, this.languages, userId, this.zoomLink, this.availability, this.resume, this.photo).subscribe((isSuccess: any) => {
      if (isSuccess) {
        this.messageService.add({
          severity: 'success',
          summary: 'Applied Successfully!',
          life: 3000,
        });
        this.ngOnInit();
      }
    });
  }

  downloadResume() {
    const byteArray = new Uint8Array(atob(this.resumeDL).split('').map(char => char.charCodeAt(0)));
    let blob: any = new Blob([byteArray], {type: this.resumeFileType });
    window.URL.createObjectURL(blob);
    saveAs(blob, this.resumeFileName);
  }

}
