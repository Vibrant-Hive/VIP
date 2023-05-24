import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {

  content: string = '';
  private pdfName: string = '';

  constructor(public dialog: MatDialog,
              public _gtmService: GoogleTagManagerService,
              public _userService: UserService) {
  }

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
    // if (sessionStorage.getItem('device') === 'mobile') {
    return "300px";
    // } else {
    //   return "5:4";
    // }
  }

  openDialog(topic: string): void {
    this.roadmapEvent(topic);
    this.dialogData(topic);
    this.dialog.open(DialogComponent, {
      data: {
        title: topic,
        content: this.content,
        pdfName: this.pdfName,
        origin: 'K'
      }
    });
  }

  isMobile() {
    return sessionStorage.getItem('device') === 'mobile';
  }

  dialogData(topic: string) {
    this.content = '';
    this.pdfName = '';
    switch (topic) {
      case 'Computer Basics':
        this.content = this.content + '<p>If you know how to use a smartphone,</p>'
        this.content = this.content + '<p>then you already know the basics of the computer.</p>'
        this.pdfName = 'yourSmartphoneIsAComputerAlready';
        break;
      case 'Database | SQL':
        this.content = this.content + '<p>If you have seen an Excel sheet,</p>'
        this.content = this.content + '<p>then you already know the basics of a database.</p>'
        this.content = this.content + '<p>Refer: <a href="https://www.w3schools.com/sql/sql_intro.asp" target="_blank">W3Schools</a> <br></p>'
        this.content = this.content + '<p><a></a></p>'
        this.content = this.content + '<p>Install MySQL Community Server in your PC to experiment</p>'
        this.content = this.content + '<p><a href="https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.33.0.msi" target="_blank">Download MySQL Installer</a></p>'
        this.pdfName = 'classAttendanceRegister';
        break;
      case 'Frontend | HTML':
        this.content = this.content + '<p>Open any website with Chrome PC,</p>'
        this.content = this.content + '<p>Right click on any button on the webpage,</p>'
        this.content = this.content + '<p>Select Inspect to see the HTML behind</p>'
        this.pdfName = 'youDownloadedThisDocumentClickingOnAnHTMLButton';
        break;
      case 'Backend | Programming':
        this.content = this.content + '<p>A programming language has so many concepts, don\'t get puzzled.</p>'
        this.content = this.content + '<p>As of now, try to understand just the basics like class, method, for, if, etc .</p>'
        this.content = this.content + '<p>Refer: <a href="https://www.w3schools.com/" target="_blank">W3Schools</a>, <a href="https://www.javatpoint.com/" target="_blank">JavaTpoint</a>, <a href="https://www.tutorialspoint.com/" target="_blank">Tutorials Point</a></p>'
        this.content = this.content + '<p><a></a></p>'
        this.content = this.content + '<p>Install IntelliJ Community Edition in your PC to experiment</p>'
        this.content = this.content + '<p><a href="https://www.jetbrains.com/idea/download/download-thanks.html?platform=windows&code=IIC" target="_blank">Download IntelliJ Installer</a></p>'
        this.pdfName = 'moonIsLoopingOnA28DayCycle';
        break;
      case 'Frameworks':
        this.content = this.content + '<p>Frameworks can be better explained only when you are ready with programming.</p>'
        this.content = this.content + '<p>Inside the frameworks, we will apply all the language skills for various operations.</p>'
        this.content = this.content + '<p>Book a mentor at this point to guide you better.</p>'
        this.pdfName = 'fullStackAutomobiles';
        break;
      case 'Your First App':
        this.content = this.content + '<p>Create your own projects with the acquired knowledge</p>'
        this.content = this.content + '<p><a href="https://start.spring.io/" target="_blank">Spring Initializer</a></p>'
        this.content = this.content + '<p><a href="https://angular.io/start" target="_blank">Angular Documentation</a></p>'
        this.content = this.content + '<p><a href="https://www.djangoproject.com/start/" target="_blank">Django Documentation</a></p>'
        this.content = this.content + '<p><a href="https://www.selenium.dev/documentation/webdriver/getting_started/first_script/" target="_blank">Selenium Documentation</a></p>'
        break;
    }
  }

  roadmapEvent(topic: string) {
    // push GTM data layer with a custom event
    const gtmTag = {
      event: topic + '-click',
      data: 'roadmap-item-click-event',
    };
    this._gtmService.pushTag(gtmTag);

    this._userService.registerUserEvent('roadmap topic tap : ' + topic).subscribe();
  }
}
