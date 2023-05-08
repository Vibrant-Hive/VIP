import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  title: any;
  content: any;
  pdfName: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    pdfName: string; title: string, content: string
  }, private dialogRef: MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
    this.pdfName = this.data.pdfName;
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onDownloadClick(): void {

  }
}
