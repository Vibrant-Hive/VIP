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
      return "1:1";
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
        this.contentArr.push('Refer: <a href="https://www.w3schools.com/sql/sql_intro.asp" target="_blank">W3Schools</a> <br>');
        this.contentArr.push('<a></a>')
        this.contentArr.push('Install MySQL Community Server in your PC to experiment');
        this.contentArr.push('<a href="https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.33.0.msi" target="_blank">Download MySQL Installer</a>');
        break;
      case 'Frontend | HTML Basics':
        this.contentArr.push('Open <a href="https://www.amazon.in" target="_blank">Amazon</a> website with Chrome desktop,');
        this.contentArr.push('Right click on any button on the webpage,');
        this.contentArr.push('Select Inspect to see the HTML behind');
        break;
      case 'Backend | Java/Python Basics':
        this.contentArr.push('A programming language has so many concepts, don\'t get puzzled.');
        this.contentArr.push('As of now, try to understand just the basics like class, method, for, if, etc .');
        this.contentArr.push('Refer: <a href="https://www.w3schools.com/" target="_blank">W3Schools</a>, <a href="https://www.javatpoint.com/" target="_blank">JavaTpoint</a>, <a href="https://www.tutorialspoint.com/" target="_blank">Tutorials Point</a>');
        this.contentArr.push('<a></a>')
        this.contentArr.push('Install IntelliJ Community Edition in your PC to experiment');
        this.contentArr.push('<a href="https://www.jetbrains.com/idea/download/download-thanks.html?platform=windows&code=IIC" target="_blank">Download IntelliJ Installer</a>');
        break;
      case 'Frameworks':
        this.contentArr.push('Frameworks can be better explained only when you are ready with programming.');
        this.contentArr.push('Inside the frameworks, we will apply all the language skills for the backend processes.');
        this.contentArr.push('Book a mentor at this point to guide you better.');
        break;
      case 'Your First App':
        this.contentArr.push('Create your own projects with the acquired knowledge' );
        this.contentArr.push('<a href="https://start.spring.io/" target="_blank">Spring Initializer</a>' );
        this.contentArr.push('<a href="https://angular.io/start" target="_blank">Angular Documentation</a>');
        this.contentArr.push('<a href="https://www.djangoproject.com/start/" target="_blank">Django Documentation</a>');
        this.contentArr.push('<a href="https://www.selenium.dev/documentation/webdriver/getting_started/first_script/" target="_blank">Selenium Documentation</a>');
        break;
    }
  }
}
