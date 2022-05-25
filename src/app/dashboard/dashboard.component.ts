import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../service/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fileName?: string;
  resume?: File;
  fullName: any;
  skills: any;
  experience: any;
  underReview: boolean = false;

  constructor(private _dashboardService: DashboardService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("role") === 'MENTOR' && Boolean(sessionStorage.getItem("active"))){
      this.underReview = true;
    }
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    this.resume = $event.target.files[0];

    if (this.resume) {
      this.fileName = this.resume.name;
    }
  }

  apply() {
    let userId = sessionStorage.getItem('userId');
    this._dashboardService.apply(this.fullName, this.skills, this.experience, userId, this.resume).subscribe(isSuccess => {
      if (isSuccess) {
        alert('success');
      }
    });
  }

}
