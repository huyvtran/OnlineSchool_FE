import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {
  AddquestionForm: FormGroup;
  assignmentForm: FormGroup;
  assignment: any[];
  entry: any;
  modeldata = [];
  selectedData: any = [];
  qtnary: any = [];
  checkedData: any = [];
  mode;
  subjectName: any;
  currSubId: any;
  currSubClassLessId: any;
  instCurrClassSecId: any;
  currId: any;
  classId: any;
  lessonName: any;
  lessonId: any;
  cssClass: any;
  teacherId: string;
  assignmentdisable = false;
  cssImage: any;
  videoStatus: any;
  accesslevelid: string;
  groupid: string;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
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
    this.teacherId = this.dataStorage.teacherid;
    this.loadAssignments();
  }

  ionViewDidEnter() {
    this.loadAssignments();
  }

  loadAssignments() {
    const obj = {
      classid: this.classId,
      subid: this.currSubId,
      teacherid: this.teacherId,
      lessonid: this.currSubClassLessId,
    };
    this.http
      .postData('assignment/getaddedassignments', obj)
      .subscribe((response: any) => {
        this.assignment = response.body;
        // alert(this.assignment.length);
        for (let i = 0; i < this.assignment.length; i++) {
          if (this.assignment[i].ASSIGNMENTSTATUS === 1) {
            console.log(this.assignment[i].ASSIGNMENTSTATUS);
            // this.assignmentdisable = true
          }
        }
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure, you want to logout ?',
      buttons: [
        {
          text: 'NO',
          /*  cssClass: 'black', */
          handler: () => {
            this.menuController.close();
            console.log('Confirm Okay');
          },
        },
        {
          text: 'YES',
          role: 'YES',
          cssClass: 'secondary',
          handler: (blah) => {
            this.menuController.close();
            this.router.navigate(['/']);
            this.dataStorage.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  navigatepostsubmit(ASSIGNMENTID, ASSIGNMENTSTATUS) {
    const obj = {
      assignmentid: ASSIGNMENTID,
      status: 2,
    };
    this.http
      .postData('assignment/updateassignmentstatus', obj)
      .subscribe(async (response: any) => {
        const respObj: any = response.body;
        const status = respObj.status;
        if (status === true) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Success',
            message: 'Assignment Saved Successfully.',
            buttons: ['OK'],
          });
          await alert.present();
          this.loadAssignments();
        } else {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Failed',
            message: 'Assignment Saved Failed.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }
  navigateaddassignment() {
    const obj: any = {
      subjectName: this.subjectName,
      currSubId: this.currSubId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      classId: this.classId,
      currId: this.currId,
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/add-assignment', 'add']);
  }
  navigateeditassignment(ASSIGNMENTID) {
    const obj: any = {
      subjectName: this.subjectName,
      currSubId: this.currSubId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      classId: this.classId,
      currId: this.currId,
      ASSIGNMENTID,
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/add-assignment', 'edit']);
  }

  navigateviewassignment(ASSIGNMENTID) {
    const obj: any = {
      ASSIGNMENTID,
      subjectName: this.subjectName,
      currSubId: this.currSubId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      classId: this.classId,
      currId: this.currId,
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/add-assignment', 'view']);
  }
  loadteacherpage() {
    const obj = {
      subjectName: this.subjectName,
      lessonName: this.lessonName,
      lessonId: this.lessonId,
      currSubClassLessId: this.currSubClassLessId,
      currSubId:  this.currSubId,
      cssClass: this.cssClass,
      cssImage: this.cssImage,
      classId: this.classId,
      currId: this.currId,
     
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/teacher-doubt']);
  }

  loadReportPage() {
    const obj = {
      subjectName: this.subjectName,
      lessonName: this.lessonName,
      lessonId: this.lessonId,
      currSubClassLessId: this.currSubClassLessId,
      currSubId:  this.currSubId,
      cssClass: this.cssClass,
      cssImage: this.cssImage,
      classId: this.classId,
      currId: this.currId,
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/report']);
  }
  loadaddvideo() {
    const obj = {
      subjectName : this.subjectName,
      lessonId : this.lessonId,
      lessonName : this.lessonName,
      videoStatus : this.videoStatus,
      cssClass: this.cssClass,
      cssImage: this.cssImage,
      classId: this.classId,
      currId: this.currId,
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

  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }

}
