import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentResultPage } from '../student-result/student-result.page';
@Component({
  selector: 'app-student-assignmentlist',
  templateUrl: './student-assignmentlist.page.html',
  styleUrls: ['./student-assignmentlist.page.scss'],
})
export class StudentAssignmentlistPage implements OnInit {
  subjectName: any;
  currSubId: any;
  currSubClassLessId: any;
  instCurrClassSecId: any;
  lessonId: any;
  lessonName: any;
  classId: any;
  currId: any;
  cssClass: any;
  teacherId: string;
  assignment: any = [];
  ASSIGNMENTID1: any;
  studentid: string;
  cssImage: any;
  groupid: string;
  accesslevelid: string;

  constructor(
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
    this.studentid = this.dataStorage.studentid;
    this.subjectName = this.dataStorage.getDetails().subjectName;
    this.currSubId = this.dataStorage.getDetails().currSubId;
    this.currSubClassLessId = this.dataStorage.getDetails().currSubClassLessId;
    this.instCurrClassSecId = this.dataStorage.getDetails().instCurrClassSecId;
    this.lessonId = this.dataStorage.getDetails().lessonId;
    this.lessonName = this.dataStorage.getDetails().lessonName;
    this.classId = this.dataStorage.getDetails().classId;
    this.currId = this.dataStorage.getDetails().currId;
    this.cssClass = this.dataStorage.getDetails().cssClass;
    this.cssImage = this.dataStorage.getDetails().cssImage;
    this.teacherId = this.dataStorage.getDetails().teacherid;
    this.loadAssignments()
    
  }

  ionViewDidEnter() {
    this.loadAssignments()
  }

loadAssignments() {
  const obj = {
    subid : this.currSubId,
    lesid : this.currSubClassLessId,
    secid:  this.instCurrClassSecId,
    studentid: this.studentid
  }
  this.http.postData('assignment/getassignmentsforstudents', obj)
  .subscribe((response : any) => {
     this.assignment = response.body;
  });
}
async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Are you sure, you want to logout ?',
    buttons: [
      {
        text: 'NO',
        handler: () => {
          this.menuController.close();
          console.log('Confirm Okay');
        }
      }, {
        text: 'YES',
        role: 'YES',
        cssClass: 'secondary',
        handler: (blah) => {
          this.menuController.close();
          this.router.navigate(['/']);
          this.dataStorage.logout();
        }
      }
    ]
  });
 await alert.present();
}

navigateaddassignment(ASSIGNMENTID) {
  const obj: any = {
    ASSIGNMENTID: ASSIGNMENTID,
    subjectName : this.subjectName,
    currSubId : this.currSubId,
    currSubClassLessId : this.currSubClassLessId,
    instCurrClassSecId : this.instCurrClassSecId,
    lessonId : this.lessonId,
    lessonName : this.lessonName,
    classId : this.classId,
    currId : this.currId,
  };
  this.dataStorage.storeDetails(obj);
  this.router.navigate(['/online-school/student-assignment' , 'add']);
}
navigateviewassignment(ASSIGNMENTID) {
  const obj: any = {
    ASSIGNMENTID: ASSIGNMENTID,
    subjectName : this.subjectName,
    currSubId : this.currSubId,
    currSubClassLessId : this.currSubClassLessId,
    instCurrClassSecId : this.instCurrClassSecId,
    lessonId : this.lessonId,
    lessonName : this.lessonName,
    classId : this.classId,
    currId : this.currId,
  };
  this.dataStorage.storeDetails(obj);
  this.router.navigate(['/online-school/student-assignment' , 'view']);
}
 async presentModal(ASSIGNMENTID) {
  // this.ASSIGNMENTID1 = ASSIGNMENTID
   //alert( this.ASSIGNMENTID1);
  const modal = await this.modalController.create({
    component: StudentResultPage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      ASSIGNMENTID: ASSIGNMENTID,
      currSubClassLessId : this.currSubClassLessId,
      instCurrClassSecId : this.instCurrClassSecId,
      lessonId : this.lessonId,
      lessonName : this.ASSIGNMENTID1,
    }
   
  });
  //console.log(ASSIGNMENTID)
  return await modal.present();
}
loadlisteningpage() {
  const obj = {
    currSubClassLessId:  this.currSubClassLessId,
    instCurrClassSecId: this.instCurrClassSecId,
    subjectName: this.subjectName,
    lessonId: this.lessonId,
    lessonName: this.lessonName
  };
  this.dataStorage.storeDetails(obj);
  this.router.navigate(['/online-school/listening-lesson']);
}
loadreadinglessonpage() {
  const obj = {
    currId: this.currId,
    classId: this.classId,
    currSubId: this.currSubId,
    currSubClassLessId:this.currSubClassLessId,
    instCurrClassSecId: this.instCurrClassSecId,
    subjectName: this.subjectName,
    lessonId: this.lessonId,
    lessonName: this.lessonName,
    cssClass: this.cssClass,
    cssImage: this.cssImage
  };
  console.log(obj);
  this.dataStorage.storeDetails(obj);
  this.router.navigate(['/online-school/reading-lesson']);
}
loadraisingdoubtpage() {
  const obj = {
        currSubId: this.currSubId,
        currSubClassLessId:  this.currSubClassLessId,
        instCurrClassSecId: this.instCurrClassSecId,
        subjectName: this.subjectName,
        lessonId: this.lessonId,
        lessonName: this.lessonName,
        cssClass: this.cssClass,
        cssImage: this.cssImage
    };
  this.dataStorage.storeDetails(obj);
  //console.log( this.dataService.storeDetails(obj));
  this.router.navigate(['/online-school/raising-doubt']);
}
navigatetohome() {
  if (this.accesslevelid === '1' && this.groupid === '2') {
    this.router.navigate(['/online-school/select-curriculum']);
  } else if (this.accesslevelid === '1' && this.groupid === '3') {
    this.router.navigate(['/online-school/activity']);
  }
}
}
