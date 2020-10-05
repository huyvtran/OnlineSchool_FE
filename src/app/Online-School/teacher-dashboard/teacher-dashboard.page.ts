import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss'],
})
export class TeacherDashboardPage implements OnInit {
  loadData: (string | number)[][];
  title = 'Lessons';
  options = {title: 'Teacher Wise', isStacked:true,
  vAxis: {
     minValue: 0,
    titleTextStyle: {color: 'Orange'},
    ticks: [0, 2, 4, 6, 8,10,12,14,16,18,20] 
},
hAxis: {
  title: 'Subjects',
  minValue: 0,
  titleTextStyle: {color: 'Orange'},
},
colors:['#92949c','#f05e1b', '#2dd36f'],
legend: {position: 'bottom',minlines: '3', maxlines :'1'}
};
width = 450;
height = 500;
type = 'ColumnChart';
columnNames = [ 'status','Not Started', 'Pending','Completed'];
  radiotype: any;
  teacherId: any;
  classid: any;
  INSTCURCLASSSECID: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataService: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.radiotype = this.dataService.getDetails().type;
    this.teacherId = this.dataService.getDetails().teacherId;
    this.classid = this.dataService.getDetails().classid;
    this.INSTCURCLASSSECID = this.dataService.getDetails().secid;
    this.loadcharts();
  }
  loadcharts() {
    const obj = {
      classId:this.classid,
      instCurClassSecId:this.INSTCURCLASSSECID,
      teacherId:  this.teacherId,
      selectionType: this.radiotype
    };
     this.http.postData('principal/getTeachersGraphicalData', obj)
      .subscribe((response: any) => {
        console.log(response);
        this.loadData = response.body;
      }); 
  }
}
