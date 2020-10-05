import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-overview',
  templateUrl: './teacher-overview.page.html',
  styleUrls: ['./teacher-overview.page.scss'],
})
export class TeacherOverviewPage implements OnInit {
  loadData: (string | number)[][];
  title: 'Teacher Wise';
  options = {isStacked: true,
  vAxis: {
    title: 'Lessons',
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
  constructor() { }

  ngOnInit() {
       this.loadData = [
        ['ENG', 2,6, 4],
        ['SCI', 3,6, 4],
        ['SOC', 5,6, 4],
        ['MAT', 1,6, 4],
        ['TEL', 4,6, 4]
    ]  
  }

}
