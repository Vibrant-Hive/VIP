import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {

  contentArr: string[] = [];

  constructor(public dialog: MatDialog) {
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
    if (sessionStorage.getItem('device') === 'mobile') {
      return "4:5";
    } else {
      return "3:2";
    }
  }

  openDialog(topic: string): void {
    this.content(topic);
    this.dialog.open(DialogComponent, {data: {title: topic, content: this.contentArr}});
  }

  isMobile() {
    return sessionStorage.getItem('device') === 'mobile';
  }

  content(topic: string) {
    this.contentArr = [];
    switch (topic) {
      case 'Computer Basics':
        this.contentArr.push('If you know how to use a smartphone,');
        this.contentArr.push('then you already know the basics of the computer.');
        break;
      case 'Database | SQL Basics':
        this.contentArr.push('If you have seen an Excel sheet,');
        this.contentArr.push('then you already know the basics of a database.');
        this.contentArr.push('Install MySQL Community Server in your PC to start with.');
        this.contentArr.push('<a href="https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.33.0.msi" target="_blank">Download Installer</a>');
        break;
      case 'Frontend | HTML Basics':
        this.contentArr.push('Open <a href="https://www.amazon.in" target="_blank">Amazon</a> website with Chrome desktop,');
        this.contentArr.push('Right click on any button on the webpage,');
        this.contentArr.push('Select Inspect to see the HTML behind');
        break;
      case 'Backend | Java Basics':
        this.contentArr.push('Java is a language which has so many concepts.');
        this.contentArr.push('As of now, try to understand just the basics mentioned.');
        this.contentArr.push('<a href="https://www.w3schools.com/java/" target="_blank">W3Schools</a>');
        this.contentArr.push('<a href="https://www.javatpoint.com/java-tutorial" target="_blank">JavaTpoint');
        this.contentArr.push('<a href="https://www.tutorialspoint.com/java/index.htm" target="_blank">Tutorials Point</a>');
        break;
      case 'Frameworks':
        this.contentArr.push('Frameworks can be better explained only when you are ready with programming.');
        this.contentArr.push('Inside the frameworks, we will apply all the language skills for the backend processes.');
        this.contentArr.push('Book a mentor at this point to guide you further');
        break;
      case 'Try it on':
        this.contentArr.push('Create your own projects by with the acquired knowledge' );
        this.contentArr.push('<a href="https://start.spring.io/" target="_blank">Spring Initializer</a>' );
        this.contentArr.push('<a href="https://angular.io/start" target="_blank">Angular Documentation</a>');
        break;
    }
  }
}
