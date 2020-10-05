import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  subjectsForm: FormGroup;
  subjects = [];
  lessons = [];
  curriculumData;
  accesslevelid: string;
  groupid: string;
  studentId: string;
  teacherId: string;
  activityId;
  displayMessage: boolean;

  constructor(
    private dataService: DataStorageService,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.accesslevelid = this.dataService.accesslevelid;
    this.groupid = this.dataService.groupid;
    this.teacherId = this.dataService.teacherid;
    this.studentId = this.dataService.studentid;
    this.route.paramMap.subscribe((params) => {
      this.activityId = params.get('activityId');
    });
    this.getDefaultDetails();
    this.getSubjectsList();
  }

  getDefaultDetails() {
    this.subjectsForm = this.formBuilder.group({
      instCurrClassSecId: this.formBuilder.control(''),
      currSubId: this.formBuilder.control(''),
    });

    this.curriculumData = this.dataService.getDetails();
    this.subjectsForm.patchValue(this.curriculumData);
  }

  getSubjectsList() {
    const obj: any = {};
    let url = '';
    if (this.accesslevelid === '1' && this.groupid === '2') {
      obj.teacherId = this.teacherId;
      obj.instCurrClassSecId = this.subjectsForm.get('instCurrClassSecId').value;
      url = 'teacher/getTeacherSubjectDetails';
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      obj.studentId = this.studentId;
      url = 'student/getStudentSubjectDetails';
    }
    this.http.postData(url, obj)
    .subscribe((subjectsData: any) => {
      if (subjectsData.body.length > 0) {
        this.subjects = subjectsData.body;
        this.displayMessage = false;
      } else {
        this.displayMessage = true;
      }
    });
  }

  navigateToLessons(currSubId: string, subjectName: string, cssClass: string, cssImage: string) {
    this.subjectsForm.patchValue({
      currSubId,
    });
    const curriculumData = this.curriculumData;
    const subjectsData = this.subjectsForm.value;
    const obj = {
      instId: curriculumData.instId,
      teacherId: curriculumData.teacherId,
      currId: curriculumData.currId,
      classId: curriculumData.classId,
      instCurrClassId: curriculumData.instCurrClassId,
      instCurrClassSecId: curriculumData.instCurrClassSecId,
      currSubId: subjectsData.currSubId,
      subjectName: subjectName,
      cssClass: cssClass,
      cssImage: cssImage,
    };
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/lessons', this.activityId]);
  }

  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }
}
