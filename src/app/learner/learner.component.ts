import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.css']
})
export class LearnerComponent implements OnInit {

  userId: any
  userStories: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')
    console.log(this.userId);
    this.userStories=[
      {
        userStoryName: "VIP-Django: Setup a new Project with Mentors App",
        userStoryLink: "https://github.com/orgs/Vibrant-Hive/projects/2/views/2?filterQuery=kavi&pane=issue&itemId=16601961",
        points: 5
      },
      {
        userStoryName: "VIP-Django: Create User Model and migrate to mysql db",
        userStoryLink: "https://github.com/orgs/Vibrant-Hive/projects/2/views/2?filterQuery=kavi&pane=issue&itemId=16608647",
        points: 3
      },
      {
        userStoryName: "VIP-Django: Configure new mysql connection",
        userStoryLink: "https://github.com/orgs/Vibrant-Hive/projects/2/views/2?filterQuery=kavi&pane=issue&itemId=16609328",
        points: 3
      },
      {
        userStoryName: "VIP-Django: Create a new View named user_view.py",
        userStoryLink: "https://github.com/orgs/Vibrant-Hive/projects/2/views/2?filterQuery=kavi&pane=issue&itemId=16823882",
        points: 5
      }
    ];
  }

  gridCols(): number {
    if (sessionStorage.getItem('device') === 'mobile') {
      return 1;
    } else {
      return 3;
    }
  }

  rowHeight() {
    if (sessionStorage.getItem('device') === 'mobile') {
      return "1:2";
    } else {
      return "2:3";
    }
  }

  githubBoard(story: any) {
    window.open(story.userStoryLink, "_blank");
  }
}
