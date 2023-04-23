import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  title: any;
  contentArr: any[]= [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string[]}, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.contentArr = this.data.content;
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
