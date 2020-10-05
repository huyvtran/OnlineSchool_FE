import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  accesslevelid: string;
  groupid: string;
  statusList = [];
  sectionData = [];
  teachingReportingForm: FormGroup;
  studentid: string;
  teacherId: string;
  instituteid: string;
  subjectName: any;
  lessonName: any;
  lessonId: any;
  currSubClassLessId: any;
  instCurrClassSecId: any;
  currSubId: any;
  lessonUploadData: any;
  dobutClarificationData: any;
  assignmentpartListData: any;
  studentStatusData: any;
  displayedColumns: string[] = ['name', 'listening', 'reading', 'assignment'];
  showSelf = true;
  showStudent = false;
  videoStatus: any;
  cssImage: any;
  cssClass: any;
  classId: any;
  currId: any;

  constructor(
    private http: HttpService,
    private dataStorage: DataStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
    this.instituteid = this.dataStorage.instId;
    this.studentid = this.dataStorage.studentid;
    this.teacherId = this.dataStorage.teacherid;
    const teacherDetails = this.dataStorage.getDetails();
    this.subjectName = teacherDetails.subjectName;
    this.lessonName = teacherDetails.lessonName;
    this.lessonId = teacherDetails.lessonId;
    this.currSubClassLessId = teacherDetails.currSubClassLessId;
    this.instCurrClassSecId = teacherDetails.instCurrClassSecId;
    this.currSubId = teacherDetails.currSubId;
    this.cssImage = teacherDetails.cssImage;
    this.cssClass = teacherDetails.cssClass;
    this.classId = teacherDetails.classId;
    this.currId = teacherDetails.currId;

    this.lessonUpload();
    this.dobutClarificationList();
    this.assignmentpartList();
    this.getAllStudentActivities();
  }

  lessonUpload() {
    const obj = {
      teacherId : this.teacherId,
      instCurrClassSecId: this.instCurrClassSecId,
      currSubClassLessId: this.currSubClassLessId
    };
    this.http.postData('report/getAllUploadedLessionsByTeacher', obj)
    .pipe(map(responseData => {
      const lessonUploadData: any = responseData.body;
      for (const item of lessonUploadData) {
        item.createdAt = new Date(item.createdAt).toString();
        const dateArray = item.createdAt.split(' ');
        item.day = dateArray[0];
        item.month = dateArray[1];
        item.date = dateArray[2];
        item.year = dateArray[3];
        item.time = dateArray[4];
      }
      return responseData;
    }))
    .subscribe((response: any) => {
      this.lessonUploadData = response.body;
      console.log(this.lessonUploadData);
    });
  }

  dobutClarificationList() {
    const obj = {
      teacherId : this.teacherId,
      instCurrClassSecId: this.instCurrClassSecId,
      currSubClassLessId: this.currSubClassLessId
    };
    this.http.postData('report/getAllDoubtClarifficationsByTeacher', obj)
    .pipe(map(responseData => {
      const dobutClarificationData: any = responseData.body;
      for (const item of dobutClarificationData) {
        item.createdAt = new Date(item.createdAt).toString();
        const dateArray = item.createdAt.split(' ');
        item.day = dateArray[0];
        item.month = dateArray[1];
        item.date = dateArray[2];
        item.year = dateArray[3];
        item.time = dateArray[4];
      }
      return responseData;
    }))
    .subscribe((response: any) => {
      this.dobutClarificationData = response.body;
      console.log(this.dobutClarificationData);
    });
  }

  assignmentpartList() {
    const obj = {
      teacherId : this.teacherId,
      instCurrClassSecId: this.instCurrClassSecId,
      currSubClassLessId: this.currSubClassLessId
    };
    this.http.postData('report/getAllTeacherAssignmentsByTeacher', obj)
    .pipe(map(responseData => {
      const dobutClarificationData: any = responseData.body;
      for (const item of dobutClarificationData) {
        item.createdAt = new Date(item.createdAt).toString();
        const dateArray = item.createdAt.split(' ');
        item.day = dateArray[0];
        item.month = dateArray[1];
        item.date = dateArray[2];
        item.year = dateArray[3];
        item.time = dateArray[4];
      }
      return responseData;
    }))
    .subscribe((response: any) => {
      this.assignmentpartListData = response.body;
      console.log(this.assignmentpartListData);
    });
  }

  getAllStudentActivities() {
    const obj = {
      instCurrClassSecId: this.instCurrClassSecId,
      currSubClassLessId: this.currSubClassLessId,
      currSubId: this.currSubId
    };
    this.http.postData('report/getAllStudentActivityStatus', obj)
    .subscribe((response: any) => {
      this.studentStatusData = response.body;
    }, (error) => {
      if (error) {
        this.studentStatusData = [];
      }
    });
  }

  loaddata(event) {
    const value = event.detail.value;
    if (value === '1') {
      this.showSelf = true;
      this.showStudent = false;
    } else if (value === '2') {
      this.showSelf = false;
      this.showStudent = true;
    }
  }

  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }

  loadaddvideo() {
    const obj = {
      subjectName : this.subjectName,
      lessonId : this.lessonId,
      lessonName : this.lessonName,
      videoStatus : this.videoStatus,
      cssClass: this.cssClass,
      cssImage: this.cssImage
    }
   
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/add-video']);
  } 
  loadAssignmentlist() {
    const obj = {
      currId:  this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      currSubClassLessId:  this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage : this.cssImage,
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/assignment']);
  }
  loadteacherpage() {
    const obj = {
      subjectName: this.subjectName,
      lessonName: this.lessonName,
      lessonId: this.lessonId,
      currSubClassLessId: this.currSubClassLessId,
      currSubId:  this.currSubId,
      cssClass: this.cssClass,
      cssImage: this.cssImage
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/teacher-doubt']);
  }
}
