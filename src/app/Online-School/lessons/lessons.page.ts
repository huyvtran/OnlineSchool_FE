import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  lessons = [];
  lessonsForm: FormGroup;
  curriculumData;
  subjectName;
  lessonName;
  lessonId;
  cssClass;
  cssImage;
  activityId;
  accesslevelid: string;
  groupid: string;
  studentId;
  displayMessage: boolean;

  constructor(
    private dataService: DataStorageService,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.accesslevelid = this.dataService.accesslevelid;
    this.groupid = this.dataService.groupid;
    this.studentId = this.dataService.studentid;
    this.route.paramMap.subscribe((params) => {
      this.activityId = params.get('activityId');
    });
    this.getDefaultDetails();
  }

  ionViewDidEnter() {
    this.getLessons();
  }

  getDefaultDetails() {
    this.lessonsForm = this.formBuilder.group({
      instId: this.formBuilder.control(''),
      teacherId: this.formBuilder.control(''),
      currId: this.formBuilder.control(''),
      classId: this.formBuilder.control(''),
      instCurrClassId: this.formBuilder.control(''),
      instCurrClassSecId: this.formBuilder.control(''),
      currSubId: this.formBuilder.control(''),
      currSubClassLessId: this.formBuilder.control(''),
    });

    this.curriculumData = this.dataService.getDetails();
    this.lessonsForm.patchValue(this.curriculumData);
    this.subjectName = this.curriculumData.subjectName;
    this.cssClass = this.curriculumData.cssClass;
    this.cssImage = this.curriculumData.cssImage;
  }

  getLessons() {
    const obj: any = {};
    let url = '';
    if (this.accesslevelid === '1' && this.groupid === '2') {
      obj.teacherId = this.lessonsForm.get('teacherId').value;
      obj.classId = this.lessonsForm.get('classId').value;
      obj.currSubId = this.lessonsForm.get('currSubId').value;
      obj.instCurrClassSecId = this.lessonsForm.get('instCurrClassSecId').value;
      if (this.activityId === '1') {
        url = 'teacher/getLessonDetailsWithVideoStatus';
      } else if(this.activityId === '3'){
        url = 'teacher/getLessonDetailsWithAssignmentStatus';
      } else
      {
        url = 'teacher/getLessonDetails';
      } 
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      obj.classId = this.lessonsForm.get('classId').value;
      obj.currSubId = this.lessonsForm.get('currSubId').value;
      obj.instCurrClassSecId = this.lessonsForm.get('instCurrClassSecId').value;
      obj.studentId = this.studentId;
      if (this.activityId === '5') {
        url = 'student/getStudentLessonDetailsWithListeningStatus';
      } else if (this.activityId === '6') {
        url = 'student/getStudentLessonDetailsWithReadingStatus';
      } else if (this.activityId === '8') {
        url = 'student/getStudentLessonDetailsWithAssignmentStatus';
      } 
      else {
        url = 'teacher/getLessonDetails';
      }
    }

    this.http.postData(url, obj)
    .subscribe((lessonsData: any) => {
      if (lessonsData.body.length > 0) {
        this.lessons = lessonsData.body;
        this.displayMessage = false;
      } else {
        this.displayMessage = true;
      }
    });
  }

  navigateToNextPage(currSubClassLessId: string, lessonId: string, lessonName: string) {
    this.lessonsForm.patchValue({
      currSubClassLessId: currSubClassLessId
    });
    this.lessonId = lessonId;
    this.lessonName = lessonName;
    switch (this.activityId) {
      case '1': {
        const obj = this.lessonsForm.value;
        obj.subjectName = this.subjectName;
        obj.lessonName = this.lessonName;
        obj.lessonId = this.lessonId;
        obj.cssClass = this.cssClass;
        obj.cssImage = this.cssImage;
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/add-video']);
        break;
      }
      case '2': {
        const obj = this.lessonsForm.value;
        obj.subjectName = this.subjectName;
        obj.lessonName = this.lessonName;
        obj.lessonId = this.lessonId;
        obj.cssClass = this.cssClass;
        obj.cssImage = this.cssImage;
        obj.currId = this.lessonsForm.get('currId').value,
        obj.classId = this.lessonsForm.get('classId').value,
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/teacher-doubt']);
        break;
      }
      case '3': {
        const obj = {
          currId: this.lessonsForm.get('currId').value,
          classId: this.lessonsForm.get('classId').value,
          currSubId: this.lessonsForm.get('currSubId').value,
          currSubClassLessId: this.lessonsForm.get('currSubClassLessId').value,
          instCurrClassSecId: this.lessonsForm.get('instCurrClassSecId').value,
          subjectName: this.subjectName,
          lessonId: this.lessonId,
          lessonName: this.lessonName,
          cssClass: this.cssClass,
          cssImage : this.cssImage,
        };
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/assignment']);
        break;
      }
      case '4': {
        const obj = this.lessonsForm.value;
        obj.subjectName = this.subjectName;
        obj.lessonName = this.lessonName;
        obj.lessonId = this.lessonId;
        obj.cssClass = this.cssClass;
        obj.cssImage = this.cssImage;
        obj.currId = this.lessonsForm.get('currId').value,
        obj.classId = this.lessonsForm.get('classId').value,
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/report']);
        break;
      }
      case '5': {
        const obj = {
          currSubClassLessId: this.lessonsForm.get('currSubClassLessId').value,
          instCurrClassSecId: this.lessonsForm.get('instCurrClassSecId').value,
          currId: this.lessonsForm.get('currId').value,
          classId: this.lessonsForm.get('classId').value,
          currSubId: this.lessonsForm.get('currSubId').value,
          subjectName: this.subjectName,
          lessonId: this.lessonId,
          lessonName: this.lessonName,
          cssClass: this.cssClass,
          cssImage: this.cssImage
        };
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/listening-lesson']);
        break;
      }
      case '6': {
        const obj = {
          currId: this.lessonsForm.get('currId').value,
          classId: this.lessonsForm.get('classId').value,
          currSubId: this.lessonsForm.get('currSubId').value,
          currSubClassLessId: this.lessonsForm.get('currSubClassLessId').value,
          instCurrClassSecId: this.lessonsForm.get('instCurrClassSecId').value,
          subjectName: this.subjectName,
          lessonId: this.lessonId,
          lessonName: this.lessonName,
          cssClass: this.cssClass,
          cssImage: this.cssImage
        };
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/reading-lesson']);
        break;
      }
      case '7': {
        const obj = {
          currId: this.lessonsForm.get('currId').value,
          classId: this.lessonsForm.get('classId').value,
          currSubId: this.lessonsForm.get('currSubId').value,
          currSubClassLessId: this.lessonsForm.get('currSubClassLessId').value,
          instCurrClassSecId: this.lessonsForm.get('instCurrClassSecId').value,
          subjectName: this.subjectName,
          lessonId: this.lessonId,
          lessonName: this.lessonName,
          cssClass: this.cssClass,
          cssImage: this.cssImage
        };
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/raising-doubt']);
        break;
      }
      case '8': {
        const obj = {
          currId: this.lessonsForm.get('currId').value,
          classId: this.lessonsForm.get('classId').value,
          currSubId: this.lessonsForm.get('currSubId').value,
          currSubClassLessId: this.lessonsForm.get('currSubClassLessId').value,
          instCurrClassSecId: this.lessonsForm.get('instCurrClassSecId').value,
          subjectName: this.subjectName,
          lessonId: this.lessonId,
          lessonName: this.lessonName,
          cssClass: this.cssClass,
          cssImage: this.cssImage
        };
        this.dataService.storeDetails(obj);
        this.router.navigate(['/online-school/student-assignmentlist']);
        break;
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
}
