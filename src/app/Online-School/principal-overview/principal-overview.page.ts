import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-principal-overview',
  templateUrl: './principal-overview.page.html',
  styleUrls: ['./principal-overview.page.scss'],
})
export class PrincipalOverviewPage implements OnInit {
  loadData: any[];
  title = 'Student OverView Dashboard';
 
  options = {
   /*  title: 'Student OverView Dashboard', */
    vAxis: {
      title: 'Strength',
      minValue: 0,
      titleTextStyle: { color: 'Orange' },
      ticks: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,22,24,26,28,30],
    },
    hAxis: {
      title: 'Classes',
      minValue: 0,
      titleTextStyle: { color: 'Orange' },
    },
    colors: [ '#336699',],
    /*  legend: {position: 'bottom', },  */
    legend: { position: 'bottom', minlines: '3', maxlines: '1' },
  };

  width = 450;
  height = 500;
  type = 'ColumnChart';
  title1 = 'Subject OverView Dashboard';
  type1 = 'PieChart';
  columnNames = [
    'Classes',
  ];
  profiledata: any;
  radiotype: any;
  curid: any;
  classid: any;
  secid: any;
  instId: string;
  subjectData: any;
  hide: boolean = false;
  hide1: boolean =  false;
  options1 = {
    title1: 'Subject OverView Dashboard',
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataService: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.hide = true;
    this.radiotype = this.dataService.getDetails().type;
    this.curid = this.dataService.getDetails().curid;
    this.classid = this.dataService.getDetails().classid;
    this.secid = this.dataService.getDetails().secid;
    this.instId = this.dataService.instId;
    this.loadcharts();
    this.loadsubjectcharts();
    /*  this.loadData = [
      ['ENG', 2,6, 4,2,3],
      ['SCI', 3,6, 4,2,3],
      ['SOC', 5,6, 4,2,3],
      ['MAT', 10,6, 4,3,4],
      ['TEL', 10,6, 4,5,6]
  ]    */
  }
 /*  loadcharts() {
    const obj = {
      instid: this.instId,
      curid: this.curid,
      classid: this.classid,
      secid: this.secid,
      type: this.type,
    };

    this.http
      .postData('principal/getacademicoverview', obj)
      .subscribe((response: any) => {
        console.log(response);
        this.loadData = response.body;
      });
  } */
  loadcharts() {
    const obj = {
      instid: this.instId,
    };

    this.http
      .postData('principal/getstudentoverview', obj)
      .subscribe((response: any) => {
        console.log(response);
        this.loadData = response.body;
      });
  }
  loadsubjectcharts() {
    const obj = {
      instid: this.instId,
    };

    this.http
      .postData('principal/getsubjectoverview', obj)
      .subscribe((response: any) => {
        console.log(response);
        this.subjectData = response.body;
      });
  }
  loaddata(event) {
    const id = event.detail.value;
    if (id === '1') {
      this.hide = true;
      this.hide1 = false;
    } else if (id === '2') {
      this.hide1 = true;
      this.hide = false;
    }
  }
}
