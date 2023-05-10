import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  title: any;
  content: any;
  pdfName: any;
  origin: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    origin: string;
    pdfName: string; title: string, content: string
  }, private dialogRef: MatDialogRef<DialogComponent>,
              public _userService: UserService) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.origin = this.data.origin;
    this.content = this.data.content;
    this.pdfName = this.data.pdfName;
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onDownloadClick(pdfName: any): void {
    this._userService.registerUserEvent('pdf download : ' + pdfName).subscribe();

    this.dialogRef.close();
  }
}
