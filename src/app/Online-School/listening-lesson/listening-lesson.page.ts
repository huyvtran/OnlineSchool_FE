import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listening-lesson',
  templateUrl: './listening-lesson.page.html',
  styleUrls: ['./listening-lesson.page.scss'],
})
export class ListeningLessonPage implements OnInit {
  lessonListeningForm: FormGroup;
  url: SafeResourceUrl = '';
  videoDetails = [];
  statusList = [];
  currSubClassLessId;
  instCurrClassSecId;
  subjectName;
  lessonId;
  lessonName;
  teacherRemarks;
  studentId;
  accesslevelid: string;
  groupid: string;
  myName: any;
  currSubId: any;
  currId: any;
  classId: any;
  showSubmitBtn = true;
  inProgressStatus: boolean;
  completedStatus: boolean;
  cssClass;
  cssImage;

  constructor(
    private dataService: DataStorageService,
    private http: HttpService,
    private router: Router,
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    public alertController: AlertController,
    public toastController: ToastController,
    public location: Location,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getDefaultDetails();
    this.accesslevelid = this.dataService.accesslevelid;
    this.groupid = this.dataService.groupid;
    this.currSubClassLessId = this.dataService.getDetails().currSubClassLessId;
    this.instCurrClassSecId = this.dataService.getDetails().instCurrClassSecId;
    this.subjectName = this.dataService.getDetails().subjectName;
    this.lessonId = this.dataService.getDetails().lessonId;
    this.lessonName = this.dataService.getDetails().lessonName;
    this.currSubId = this.dataService.getDetails().currSubId;
    this.classId = this.dataService.getDetails().classId;
    this.currId = this.dataService.getDetails().currId;
    this.cssClass = this.dataService.getDetails().cssClass;
    this.cssImage = this.dataService.getDetails().cssImage;
    this.studentId = this.dataService.studentid;
    this.getLessonVideoDetails();
    this.lessonListeningForm.patchValue({
      currSubClassLessId: this.currSubClassLessId
    });
  }

  getDefaultDetails() {
    this.lessonListeningForm = this.formBuilder.group({
      videoId: this.formBuilder.control(''),
      studentId: this.formBuilder.control(''),
      listeningStatus: this.formBuilder.control(''),
      currSubClassLessId: this.formBuilder.control(''),
      gridData: this.formBuilder.array([])
    });

    this.statusList = [
      {id: 3, name: 'In Progress'},
      {id: 4, name: 'Completed'}
    ];
  }

  getLessonVideoDetails() {
    const obj = {
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      studentId: this.studentId
    };
    this.http.postData('student/getVideoDetailsByLesson', obj)
    .subscribe((response: any) => {
      if (response.body) {
        this.videoDetails = response.body;
        const screenFormGroups = this.videoDetails.map(screen => this.formBuilder.group(screen));
        const screenFormArray = this.formBuilder.array(screenFormGroups);
        this.lessonListeningForm.setControl('gridData', screenFormArray);
        /* this.lessonListeningForm.patchValue({
          studentId: this.studentId
        }); */
        /* this.teacherRemarks = videoDetails.TEACHERREMARKS;
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(videoDetails.VIDEOAUDIOPATH);
        */
      }
    });
  }

  selectStatus(status: number, videoId: string) {
    // alert(status + ' ' + videoId);
    if (status === 3) {
      this.lessonListeningForm.patchValue({
        studentId: this.studentId,
        listeningStatus: status,
        videoId: videoId
      });
      this.inProgressStatus = true;
      this.completedStatus = false;
    } else if (status === 4) {
      this.lessonListeningForm.patchValue({
        studentId: this.studentId,
        listeningStatus: status,
        videoId: videoId
      });
      this.inProgressStatus = false;
      this.completedStatus = true;
    }
  }

  async onSubmit() {
    if (this.lessonListeningForm.valid) {
      const studentObj = this.lessonListeningForm.value;
      studentObj.instCurrClassSecId = this.instCurrClassSecId;
      studentObj.currSubId = this.currSubId;
      delete studentObj.gridData;
      console.log(studentObj);
      if (studentObj.listeningStatus !== '' && studentObj.listeningStatus !== null) {
        this.http.postData('student/saveStudentListenings', studentObj)
        .subscribe(async (response: any) => {
          if (response.body) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Success',
              message: 'Status updated sucessfully',
              buttons: ['OK']
            });
            await alert.present();
            this.location.back();
          }
        });
      } else {
        const toast = await this.toastController.create({
          message: 'Please select any one of the options.',
          duration: 2000
        });
        await toast.present();
      }
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
      currSubClassLessId:  this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName
    };
    this.dataService.storeDetails(obj);
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
    this.dataService.storeDetails(obj);
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
    this.dataService.storeDetails(obj);
    console.log( this.dataService.storeDetails(obj));
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
