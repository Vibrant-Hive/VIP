import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {MentorsService, SupportRequest} from "../service/mentors/mentors.service";
import {UserService} from "../service/user/user.service";
import {User} from "../model/User";
import {saveAs} from "file-saver";
import {Router} from "@angular/router";
import {LoginService} from "../service/login/login.service";

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
    {value: '1', viewValue: 'FULL STACK'},
    {value: '7', viewValue: 'SQL'},
    {value: '6', viewValue: 'JAVA'},
    {value: '8', viewValue: 'PYTHON'},
    {value: '2', viewValue: 'ANGULAR'},
    {value: '5', viewValue: 'SELENIUM'},
    {value: '4', viewValue: 'TESTING'},
    {value: '3', viewValue: 'ANDROID'},
    // {value: 'GRAPHICS DESIGN', viewValue: 'GRAPHICS DESIGN'},
    // {value: 'ARCH. DESIGN', viewValue: 'ARCH. DESIGN'}
  ];
  email?: string;
  showProfileDetails?: boolean;
  skillSetId: any;
  relatedTechnologies: any;
  supportRequestStatus: any;
  @ViewChild("myTooltip") myTooltip: any;

  constructor(private _mentorsService: MentorsService, private messageService: MessageService, private _userService: UserService, private _authClient: LoginService, private _router: Router) {
    if (!this._authClient.isLoggedIn()) {
      sessionStorage.setItem('redirectUrl', '/profile');
      this._router.navigate(['/login']).then();
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('action') === 'edit') {
      this.editing = true;
    }
    this._userService.getUser(sessionStorage.getItem('selectedUserId')).subscribe((user: User) => {
      this.fullName = user.fullName;
      this.availability = user.availability ? user.availability.split(',') : '';
      this.zoomLink = user.zoomLink;
      this.skillSetId = user.skillSet.id.toString();
      this.skills = user.skillSet.skillSetName;
      this.relatedTechnologies = user.skillSet.relatedTechnologies;
      this.designation = user.designation;
      this.experience = user.experience;
      this.languages = user.languages ? user.languages.split(',') : '';
      this.active = user.active;
      this.role = user.role;
      this.mobileNo = user.mobileNo;
      this.email = user.email;

      if (user.mentorFiles) {
        this.resume = user.mentorFiles.resume;
        this.resumeDL = this.resume;
        this.photo = user.mentorFiles.photo;
        this.photoName = user.mentorFiles.photoFileName;
        this.photoDP = 'data:image/png;base64,' + user.mentorFiles.photo;
        this.resumeFileName = user.mentorFiles.resumeFileName;
        this.resumeFileType = user.mentorFiles.resumeFileType;
        this.fileName = user.mentorFiles.resumeFileName;
      }

      if (!this.role) {
        this.active = false;
        this.role = "MENTOR";
        this.applyButtonText = "Apply as Mentor"
      } else {
        if (this.role === 'MENTOR' && !this.active) {
          this.underReview = true;
        } else {
          this.yourProfileShow = true;
        }
        this.applyButtonText = "Save Profile"
        this.yourProfileShow = true;
      }
      this.showProfileDetails = true;

      this._mentorsService.getSupportRequest(sessionStorage.getItem('userId'), sessionStorage.getItem('selectedUserId'))
        .subscribe((sr: SupportRequest) => {
          if (sr) {
            if (sr.verified)
              this.supportRequestStatus = 'VERIFIED';
            else
              this.supportRequestStatus = 'PENDING';
          } else {
            this.supportRequestStatus = 'NOT REQUESTED';
          }
        });
    });

  }

  gridCols(): number {
    if (sessionStorage.getItem('device') === 'mobile') {
      return 1;
    } else {
      if (sessionStorage.getItem('action') === 'edit') {
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
    this._mentorsService.updateProfile(this.fullName, this.skillSetId, this.role, this.active, this.experience, this.designation, this.languages, userId, this.zoomLink, this.availability, this.resume, this.photo).subscribe((isSuccess: any) => {
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
    if (this._authClient.isLoggedIn()) {
      const byteArray = new Uint8Array(atob(this.resumeDL).split('').map(char => char.charCodeAt(0)));
      let blob: any = new Blob([byteArray], {type: this.resumeFileType});
      window.URL.createObjectURL(blob);
      saveAs(blob, this.resumeFileName);
    } else {
      this._router.navigate(['/login']).then();
    }
  }

  rowHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "1:1";
    } else {
      if (sessionStorage.getItem('action') === 'edit') {
        return "1:1";
      } else {
        return "3:2";
      }
    }
  }

  whatsAppRedirect() {
    window.open("https://wa.me/91" + this.mobileNo + "?text=Hi,%20I%20need%20your%20support%2E%20", "_blank");
  }

  zoomRedirect() {
    window.open(this.zoomLink, "_blank");
  }

  requestForSupport() {
    this._mentorsService.requestForSupport(sessionStorage.getItem('userId'), sessionStorage.getItem('selectedUserId'))
      .subscribe((sr: SupportRequest) => {

      });
  }

  public displayTooltip(){
    this.myTooltip.disabled = false;
    this.myTooltip.show()
    setTimeout(() => {
      this.myTooltip.disabled = true;
    }, 10000);
  }
}
