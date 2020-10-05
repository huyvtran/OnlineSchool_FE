import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController, AlertController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage implements OnInit {
  loadData: (string | number)[][];
  title = 'Lessons';
  options = {
    title: 'Student Wise',
    isStacked: true,
    vAxis: {
      title: 'Lessons',
      minValue: 0,
      titleTextStyle: { color: 'Orange' },
      ticks: [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
      ],
    },
    hAxis: {
      title: 'Subjects',
      minValue: 0,
      titleTextStyle: { color: 'Orange' },
    },
    colors: ['#92949c', '#f05e1b', '#2dd36f'],
    legend: { position: 'bottom', minlines: '3', maxlines: '1' },
  };
  width = 450;
  height = 500;
  type = 'ColumnChart';
  columnNames = ['status', 'Not Started', 'Pending', 'Completed'];
  instId: string;
  secid: any;
  classid: any;
  curid: any;
  radiotype: any;
  stuid: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataService: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.radiotype = this.dataService.getDetails().type;
    this.curid = this.dataService.getDetails().curid;
    this.classid = this.dataService.getDetails().classid;
    this.secid = this.dataService.getDetails().secid;
    this.stuid = this.dataService.getDetails().stuid;
    this.instId = this.dataService.instId;
    this.loadcharts();
  }
  loadcharts() {
    const obj = {
      classId: this.classid,
      instCurClassSecId: this.secid,
      studentId: this.stuid,
      selectionType: this.radiotype,
    };
    this.http
      .postData('principal/getStudentGrapicalData', obj)
      .subscribe((response: any) => {
        console.log(response);
        this.loadData = response.body;
      });
  }
}
