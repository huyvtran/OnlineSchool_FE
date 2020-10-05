import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AlertController, MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  activityForm: FormGroup;
  activitiesData = [];
  accesslevelid: string;
  groupid: string;
  teacherId: string;
  studentId: string;
  teacherDetails;
  studentDetails;
  curriculumData;
  circleCssData = [
    { circleCss: 'circle_1' },
    { circleCss: 'circle_2' },
    { circleCss: 'circle_3' },
    { circleCss: 'circle_4' },
  ];
  profiledata: any;
  subscribe: any;
  backButtonSubscription: any;
  extraActivities = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
    this.teacherId = this.dataStorage.teacherid;
    this.studentId = this.dataStorage.studentid;
    this.loadDefaultData();
    this.loadActivitesData();
    this.loadTeacherOrStudentData();
    this.loadinstitutename();
  }

  loadDefaultData() {
    this.activityForm = this.formBuilder.group({
      instId: this.formBuilder.control(''),
      teacherId: this.formBuilder.control(''),
      currId: this.formBuilder.control(''),
      instCurrId: this.formBuilder.control(''),
      classId: this.formBuilder.control(''),
      instCurrClassId: this.formBuilder.control(''),
      instCurrClassSecId: this.formBuilder.control(''),
    });
  }

  loadActivitesData() {
    const obj = {
      accesslevelid: this.accesslevelid,
      groupid: this.groupid,
    };
    this.http
      .postData('teacher/getActivityDetails', obj)
      .subscribe((activitiesData: any) => {
        if (activitiesData.body.length > 0) {
          for (let i = 0; i < activitiesData.body.length; i++) {
            activitiesData.body[i].circleCss = this.circleCssData[i].circleCss;
          }
          this.activitiesData = activitiesData.body;
          this.extraActivities = [
            {
              id: 1,
              name: 'Fee',
              icon: 'wallet'
            },
            {
              id: 2,
              name: 'Calendar',
              icon: 'calendar'
            },
            {
              id: 3,
              name: 'Attendance',
              icon: 'book'
            },
            {
              id: 4,
              name: 'Time Table',
              icon: 'time'
            },
            {
              id: 5,
              name: 'Notices',
              icon: 'newspaper'
            },
            {
              id: 6,
              name: 'Gallery',
              icon: 'images'
            },
          ];
        } else {
          this.activitiesData = [];
        }
      });
  }

  loadTeacherOrStudentData() {
    const obj: any = {};
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.curriculumData = this.dataStorage.getDetails();
      this.activityForm.patchValue(this.curriculumData);

      obj.teacherId = this.teacherId;
      this.http
        .postData('teacher/getAllTeacherDetails', obj)
        .subscribe((result) => {
          this.teacherDetails = result.body;
        });
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      obj.studentId = this.studentId;
      this.http
        .postData('student/getAllStudentDetails', obj)
        .subscribe((result) => {
          this.studentDetails = result.body;
          console.log('student details ===> ', this.studentDetails);
          this.activityForm.patchValue({
            classId: this.studentDetails.CLASSID,
            currId: this.studentDetails.CURRID,
            instCurrClassSecId: this.studentDetails.INSTCURCLASSSECID,
          });
        });
    }
  }

  navigateToPages(activityId) {
    switch (activityId) {
      case 1: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 2: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 3: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 4: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 5: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 6: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 7: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
      case 8: {
        const obj = this.activityForm.value;
        this.dataStorage.storeDetails(obj);
        this.router.navigate(['/online-school/subjects', activityId]);
        break;
      }
    }
  }

  loadinstitutename() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      const obj = {
        id: this.teacherId,
        logintype: 2,
      };
      this.http
        .postData('auth/getdatalogintype', obj)
        .subscribe((response: any) => {
          this.profiledata = response.body.institutename;
        });
      } else if (this.accesslevelid === '1' && this.groupid === '3') {
        const obj = {
          id: this.studentId,
          logintype: 1,
        };
        this.http
        .postData('auth/getdatalogintype', obj)
        .subscribe((response: any) => {
          this.profiledata = response.body.institutename;
        });
    }
  }

  ionViewWillEnter() {
    this.platform.backButton.subscribeWithPriority(1, () => {
      navigator['app'].exitApp();
    });
  }

  /* ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  } */

  ionViewDidEnter() {
    console.log(this.constructor.name + '4');
    this.subscribe = this.platform.backButton.subscribeWithPriority(6666, () => {
      if (this.constructor.name === 'ActivityPage') {
        console.log(this.constructor.name);
        if (window.confirm('do you want to exit app')) {
          navigator['app'].exitApp();
        }
      }
    });
  }
}
