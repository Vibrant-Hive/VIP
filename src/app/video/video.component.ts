import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  videoWidth() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "240";
    } else {
      return "1080";
    }
  }

  videoHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "144";
    } else {
      return "540";
    }
  }
}
