import {Component, OnInit} from '@angular/core';
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
  appliedMentorsShow: boolean = false;
  applyMentorShow: boolean = false;
  availableMentorsShow: boolean = false;
  dataSource: any[] = [{position: 1, name: 'Salaha', experience: 5, skills: 'Java'}];
  displayedColumns: string[] = ['position', 'name', 'experience', 'skills', 'resume', 'approve'];
  constructor(private _dashboardService: DashboardService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("role") === 'MENTOR' && Boolean(sessionStorage.getItem("active"))) {
      this.underReview = true;
    } else if (sessionStorage.getItem("role") === 'MASTER') {
      this.appliedMentorsShow = true;
    } else {
      this.availableMentorsShow = true;
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

  apply() {
    let userId = sessionStorage.getItem('userId');
    if (this.resume) {
      this._dashboardService.apply(this.fullName, this.skills, this.experience, userId, this.resume).subscribe(isSuccess => {
        if (isSuccess) {
          alert('success');
        }
      });
    }
  }

}
