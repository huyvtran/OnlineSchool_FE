import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { OpenPdfPage } from './open-pdf/open-pdf.page';

@Component({
  selector: 'app-reading-lesson',
  templateUrl: './reading-lesson.page.html',
  styleUrls: ['./reading-lesson.page.scss'],
})
export class ReadingLessonPage implements OnInit {
  readingLessonForm: FormGroup;
  studentData;
  curriculumName: string;
  className: string;
  subjectName: string;
  lessonId: string;
  lessonName: string;
  studentId: string;
  statusList = [];
  accesslevelid: string;
  groupid: string;
  currSubClassLessId: any;
  instCurrClassSecId: any;
  currSubId: any;
  classId: any;
  currId: any;
  inProgressStatus: boolean;
  completedStatus: boolean;
  showNewFlag: boolean;
  cssClass;
  cssImage;

  constructor(
    private dataService: DataStorageService,
    private http: HttpService,
    private router: Router,
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    public alertController: AlertController,
    public location: Location,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getDefaultDetails();
    this.accesslevelid = this.dataService.accesslevelid;
    this.groupid = this.dataService.groupid;
    this.studentData = this.dataService.getDetails();
    this.studentId = this.dataService.studentid;
    this.subjectName = this.studentData.subjectName;
    this.lessonId = this.studentData.lessonId;
    this.lessonName = this.studentData.lessonName;
    this.cssClass = this.studentData.cssClass;
    this.cssImage = this.studentData.cssImage;
    // code added by yaswanth for tabs
    this.currSubClassLessId = this.studentData.currSubClassLessId;
    this.instCurrClassSecId = this.studentData.instCurrClassSecId;
    this.currSubId = this.studentData.currSubId;
    this.classId = this.studentData.classId;
    this.currId = this.studentData.currId;

    this.getCurriculumNameById();
    this.getClassNameById();
    this.getStudentReadingRecord();
    this.readingLessonForm.patchValue(this.studentData);
    this.readingLessonForm.patchValue({ studentId: this.studentId });
  }

  getDefaultDetails() {
    this.readingLessonForm = this.formBuilder.group({
      studentId: this.formBuilder.control(''),
      currSubId: this.formBuilder.control(''),
      currSubClassLessId: this.formBuilder.control(''),
      instCurrClassSecId: this.formBuilder.control(''),
      lessonStatus: this.formBuilder.control(''),
    });
    this.statusList = [
      {id: 3, name: 'In Progress'},
      {id: 4, name: 'Completed'}
    ];
  }

  getCurriculumNameById() {
    const obj = {
      currId: this.studentData.currId,
    };
    this.http
      .postData('student/getCurriculumNameById', obj)
      .subscribe((result: any) => {
        this.curriculumName = result.body.CURRICULUMNAME;
      });
  }

  getClassNameById() {
    const obj = {
      classId: this.studentData.classId,
    };
    this.http
      .postData('student/getClassNameById', obj)
      .subscribe((result: any) => {
        this.className = result.body.CLASSNAME;
      });
  }

  getStudentReadingRecord() {
    const obj = {
      studentId: this.studentId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId
    };
    this.http.postData('student/getStudentReadingRecord', obj)
    .subscribe((result: any) => {
      if (result.body) {
        this.showNewFlag = false;
        const studentReadingObj = result.body;
        this.readingLessonForm.patchValue({
          lessonStatus: studentReadingObj.LESSIONSTATUS
        });
      } else {
        this.showNewFlag = true;
      }
    });
  }

  getPdfDownload() {
    const curriculumName = this.curriculumName;
    const className = this.className;
    const subjectName = this.subjectName;
    const lessonId = this.lessonId;
    const lessonName = this.lessonName;

    // tslint:disable-next-line: max-line-length
    window.open(
      environment.serverUrl +
        '/student/downloadLessonPdf?curriculumName=' +
        curriculumName +
        '&className=' +
        className +
        '&subjectName=' +
        subjectName +
        '&lessonId=' +
        lessonId +
        '&lessonName=' +
        lessonName,
      '_blank'
    );
  }

  async openPdf() {
    const modal = this.modalCtrl.create({
      component: OpenPdfPage,
      cssClass: 'my-custom-class',
      componentProps: {
        curriculumName: this.curriculumName,
        className: this.className,
        subjectName: this.subjectName,
        lessonId: this.lessonId,
        lessonName: this.lessonName
      }
    });
    return (await modal).present();
  }

  selectStatus(status: string) {
    if (status === '3') {
      this.readingLessonForm.patchValue({
        lessonStatus: status,
      });
      this.inProgressStatus = true;
      this.completedStatus = false;
    } else if (status === '4') {
      this.readingLessonForm.patchValue({
        lessonStatus: status,
      });
      this.inProgressStatus = false;
      this.completedStatus = true;
    }
  }

  onSubmit() {
    if (this.readingLessonForm.valid) {
      const obj = this.readingLessonForm.value;
      this.http
        .postData('student/saveStudentReadings', obj)
        .subscribe(async (response: any) => {
          if (response.body) {
            const alert = await this.alertController.create({
              header: 'Success',
              message: 'Status updated sucessfully',
              buttons: ['OK'],
            });
            await alert.present();
            this.location.back();
          }
        });
    }
  }
  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }

  loadlisteningpage() {
    const obj = {
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      currId: this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      cssClass: this.cssClass,
      cssImage: this.cssImage
    };
    this.dataService.storeDetails(obj);
    console.log(this.dataService.storeDetails(obj));
    this.router.navigate(['/online-school/listening-lesson']);
  }
  loadraisingdoubtpage() {
    const obj = {
      currSubId: this.currSubId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
    };
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/raising-doubt']);
  }
  loadstudentassignment() {
    const obj = {
      currId: this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      currSubClassLessId:  this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage: this.cssImage
    };
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/student-assignmentlist']);
  }
}
