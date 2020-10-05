import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-select-curriculum',
  templateUrl: './select-curriculum.page.html',
  styleUrls: ['./select-curriculum.page.scss'],
})
export class SelectCurriculumPage implements OnInit {
  curriculumForm: FormGroup;
  hours;
  minutes;
  salutation;
  curriculumData = [];
  classData = [];
  sectionData = [];
  activityData = [];
  mobileno;
  instId;
  profiledata: any;
  teacherId: string;
  disablebutton: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataService: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.mobileno = this.dataService.mobileno;
    this.instId = this.dataService.instId;
    this.teacherId = this.dataService.teacherid;
    this.getSalutation();
    this.getDefaultDetails();
    this.getCurriculumData();
    this.loadinstitutename();
  }

  getDefaultDetails() {
    this.curriculumForm = this.formBuilder.group({
      instId: this.formBuilder.control(''),
      teacherId: this.formBuilder.control(''),
      currId: this.formBuilder.control(''),
      instCurrId: this.formBuilder.control(''),
      classId: this.formBuilder.control(''),
      instCurrClassId: this.formBuilder.control(''),
      instCurrClassSecId: this.formBuilder.control(''),
    });
  }

  getCurriculumData() {
    this.curriculumForm.patchValue({
      instId: this.instId
    });
    const obj = {
      mobileno: this.mobileno
    };
    this.http.postData('teacher/getCurriculumDetails', obj)
    .subscribe((curriculumData: any) => {
      if (curriculumData.body.length > 0) {
        this.curriculumData = curriculumData.body;
      } else {
        this.curriculumData = [];
      }
    });
  }

  getSalutation() {
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
    const currentTime = new Date().setHours(this.hours, this.minutes, 0);
    const morningTime = new Date().setHours(0, 1, 0);
    const afternoonTime = new Date().setHours(12, 0, 0);
    const eveningTime = new Date().setHours(17, 0, 0);
    const nightTime = new Date().setHours(23, 59, 0);
    const midNight = new Date().setHours(0, 0, 0);

    if (currentTime >= morningTime && currentTime < afternoonTime) {
      this.salutation = 'Good Morning!';
    } else if (currentTime >= afternoonTime && currentTime < eveningTime) {
      this.salutation = 'Good Afternoon!';
    } else if (currentTime >= eveningTime && currentTime <= nightTime) {
      this.salutation = 'Good Evening!';
    } else if (currentTime === midNight) {
      this.salutation = 'Good Night!';
    }
  }

  getClassesForSelectedCurriculum(teacherId: string, currId: number, instCurrId: string, index: number) {
    /* for (let i = 0; i < this.curriculumData.length; i++) {
      if ( i === index) {
        document.getElementById('curriculum' + i).style.backgroundColor = '#3875D9';
        document.getElementById('curriculum' + i).style.color = '#fff';
      } else {
        document.getElementById('curriculum' + i).style.backgroundColor = '#F0F8FF';
        document.getElementById('curriculum' + i).style.color = '#000';
      }
    } */

    this.curriculumForm.patchValue({
      teacherId,
      currId,
      instCurrId
    });

    const obj = {
      teacherId: this.curriculumForm.get('teacherId').value,
      instCurrId: this.curriculumForm.get('instCurrId').value
    };
    this.http.postData('teacher/getClassDetails', obj)
    .subscribe((classData: any) => {
      if (classData.body.length > 0) {
        this.classData = classData.body;
      } else {
        this.classData = [];
      }
    });
  }

  getSectionsForSelectedClass(classId: string, instCurrClassId: string, index: number) {
    /* for (let i = 0; i < this.classData.length; i++) {
      if ( i === index) {
        document.getElementById('class' + i).style.backgroundColor = '#3875D9';
        document.getElementById('class' + i).style.color = '#fff';
      } else {
        document.getElementById('class' + i).style.backgroundColor = '#F0F8FF';
        document.getElementById('class' + i).style.color = '#000';
      }
    } */

    this.curriculumForm.patchValue({
      classId,
      instCurrClassId
    });

    const obj = {
      teacherId: this.curriculumForm.get('teacherId').value,
      instCurrClassId: this.curriculumForm.get('instCurrClassId').value
    };
    this.http.postData('teacher/getSectionDetails', obj)
    .subscribe((sectionData: any) => {
      if (sectionData.body.length > 0) {
        this.sectionData = sectionData.body;
      } else {
        this.sectionData = [];
      }
    });
  }

  getSectionHighlighted(instCurrClassSecId: string, index: number) {
    /* for (let i = 0; i < this.sectionData.length; i++) {
      if ( i === index) {
        document.getElementById('section' + i).style.backgroundColor = '#3875D9';
        document.getElementById('section' + i).style.color = '#fff';
      } else {
        document.getElementById('section' + i).style.backgroundColor = '#F0F8FF';
        document.getElementById('section' + i).style.color = '#000';
      }
    } */

    this.disablebutton = true;
    this.curriculumForm.patchValue({
      instCurrClassSecId
    });
  }

  onSubmit() {
    const obj = this.curriculumForm.value;
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/activity']);
  }

  loadinstitutename() {
    const obj = {
      id: this.teacherId,
      logintype: 2
    };
    this.http.postData('auth/getdatalogintype', obj)
      .subscribe((response: any) => {
        this.profiledata = response.body.institutename;
        console.log(response);
      });
   }
}
