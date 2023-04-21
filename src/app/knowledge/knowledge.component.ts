import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
      return "4:5";
    } else {
      return "3:2";
    }
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  isMobile() {
    return sessionStorage.getItem('device') === 'mobile';
  }
}
