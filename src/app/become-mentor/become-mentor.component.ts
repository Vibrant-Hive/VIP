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
    {value: 'Morning', viewValue: 'Morning'},
    {value: 'Afternoon', viewValue: 'Afternoon'},
    {value: 'Evening', viewValue: 'Evening'},
    {value: 'Night', viewValue: 'Night'},
  ];
  languageOptions: Option[] = [
    {value: 'English', viewValue: 'English'},
    {value: 'Tamil', viewValue: 'Tamil'},
    {value: 'Hindi', viewValue: 'Hindi'},
    {value: 'Urdu', viewValue: 'Urdu'},
    {value: 'Telugu', viewValue: 'Telugu'},
    {value: 'Malayalam', viewValue: 'Malayalam'},
    {value: 'French', viewValue: 'French'},
    {value: 'Kannada', viewValue: 'Kannada'},
  ];
  applyButtonText: any;
  active?: boolean;
  role?: any;
  resumeFileName: any;
  resumeFileType: any;
  resumeDL: any;
  editing?: boolean;
  mobileNo: any;
  skillOptions: Option[] = [
    {value: 'FULL STACK', viewValue: 'FULL STACK'},
    {value: 'SQL', viewValue: 'SQL'},
    {value: 'JAVA BACKEND', viewValue: 'JAVA BACKEND'},
    {value: 'ANGULAR UI', viewValue: 'ANGULAR UI'},
    {value: 'SELENIUM AUTOMATION', viewValue: 'SELENIUM AUTOMATION'},
    {value: 'TESTING MANUAL', viewValue: 'TESTING MANUAL'},
    {value: 'GRAPHICS DESIGN', viewValue: 'GRAPHICS DESIGN'},
    {value: 'ARCHITECTURE DESIGN', viewValue: 'ARCHITECTURE DESIGN'},
  ];
  email?: string;
  showProfileDetails?: boolean;

  constructor(private _mentorsService: MentorsService, private messageService: MessageService, private _userService: UserService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('action') === 'edit') {
      this.editing = true;
    }
    this._userService.getUser(sessionStorage.getItem('currentUserId')).subscribe((user: User) => {
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
      this.fileName = user.resumeFileName;
      this.mobileNo = user.mobileNo;
      this.email = user.email;

      if(!this.role){
        this.active = false;
        this.role = "MENTOR";
        this.applyButtonText = "Apply as Mentor"
        if (this.role === 'MENTOR' && !this.active) {
          this.underReview = true;
        } else {
          this.yourProfileShow = true;
        }
      } else {
        this.applyButtonText = "Save Profile"
        this.yourProfileShow = true;
      }
      this.showProfileDetails = true;
    });
  }

  gridCols(): number {
    if (sessionStorage.getItem('device') === 'mobile') {
      return 1;
    } else {
      if(sessionStorage.getItem('action') === 'edit'){
        return 3;
      } else {
        return 2;
      }
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
          summary: 'Updated Successfully!',
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

  rowHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "1:1";
    } else {
      if(sessionStorage.getItem('action') === 'edit'){
        return "1:1";
      } else {
        return "3:2";
      }
    }
  }
}
