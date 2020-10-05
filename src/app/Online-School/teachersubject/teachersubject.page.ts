import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teachersubject',
  templateUrl: './teachersubject.page.html',
  styleUrls: ['./teachersubject.page.scss'],
})
export class TeachersubjectPage implements OnInit {
  teacherSubjectForm: FormGroup;
  InstitueData = [];
  InstitueNameData = [];
  cirriclumInstitueData = [];
  classCirriculumData = [];
  sectionByClassData = [];
  subjectBySectionData = [];
  teacherNameData = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private location: Location,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    /* this.currSubId = this.dataService.getDetails().currSubId;
    this.classId = this.dataService.getDetails().classId;
    this.currId = this.dataService.getDetails().currId;
    this.teacherId = this.dataService.teacherid; */

    this.teacherSubjectForm = this.formBuilder.group({
      CURRID: this.formBuilder.control(''),
      TEACHERID: this.formBuilder.control(''),
      INSTCURID: this.formBuilder.control(''),
      INSTCURCLASSID: this.formBuilder.control(''),
      INSTCURCLASSSECID: this.formBuilder.control(''),
      CURSUBID: this.formBuilder.control(''),
      CLASSID: this.formBuilder.control(''),
      SECTIONID: this.formBuilder.control(''),
    });

    this.getInstitueData();
  }
  getInstitueData() {
    const obj: any = {};
    this.http
      .postData('master/getAllInstituteTypes', obj)
      .subscribe((InstitueData: any) => {
        if (InstitueData.body.length > 0) {
          this.InstitueData = InstitueData.body;
        } else {
          this.InstitueData = [];
        }
      });
  }

  institueName(instTypeId: string) {
    const obj = {
      INSTTYPEID: instTypeId,
    };
    this.http
      .postData('master/loadInstitutesByInstituteType', obj)
      .subscribe((InstitueNameData: any) => {
        if (InstitueNameData.body.length > 0) {
          this.InstitueNameData = InstitueNameData.body;
        } else {
          this.InstitueNameData = [];
        }
      });
  }

  getTeacherByInstitue(instId: string) {
    const obj = {
      INSTID: instId,
    };
    this.http
      .postData('master/loadTeachersByInstitute', obj)
      .subscribe((teacherNameData: any) => {
        if (teacherNameData.body.length > 0) {
          this.teacherNameData = teacherNameData.body;
        } else {
          this.teacherNameData = [];
        }
      });
  }

  getCirriculumData(instId: string) {
    const obj = {
      INSTID: instId,
    };
    this.http
      .postData('master/loadCurriculumByInstitute', obj)
      .subscribe((cirriclumInstitueData: any) => {
        if (cirriclumInstitueData.body.length > 0) {
          this.cirriclumInstitueData = cirriclumInstitueData.body;
        } else {
          this.cirriclumInstitueData = [];
        }
      });
  }

  getClassFromCirriculum(instCurId: string) {
    this.teacherSubjectForm.patchValue({INSTCURID: instCurId});
    const obj = {
      INSTCURID: instCurId,
    };
    this.http
      .postData('master/loadClassesByCurriculumAndInstitute', obj)
      .subscribe((classCirriculumData: any) => {
        if (classCirriculumData.body.length > 0) {
          this.classCirriculumData = classCirriculumData.body;
        } else {
          this.classCirriculumData = [];
        }
      });
  }

  getSectionByClass(instCurClassId: string) {
    this.teacherSubjectForm.patchValue({INSTCURCLASSID: instCurClassId});
    const obj = {
      INSTCURCLASSID: instCurClassId,
    };
    this.http
      .postData('master/loadSectionByClassesAndCurriculumAndInstitute', obj)
      .subscribe((sectionByClassData: any) => {
        if (sectionByClassData.body.length > 0) {
          this.sectionByClassData = sectionByClassData.body;
        } else {
          this.sectionByClassData = [];
        }
      });
  }
  getSubjectBySection(currId: number) {
    const obj = {
      CURRID: currId,
    };
    this.http
      .postData('master/loadSubjectsByCurriculum', obj)
      .subscribe((subjectBySectionData: any) => {
        if (subjectBySectionData.body.length > 0) {
          this.subjectBySectionData = subjectBySectionData.body;
        } else {
          this.subjectBySectionData = [];
        }
      });
  }

  patchToTeachersForm(instCurrClassSecId: string) {
    this.teacherSubjectForm.patchValue({INSTCURCLASSSECID: instCurrClassSecId});
  }

  saveTeacherSubject() {
    console.log('teacher subject form ====> ', this.teacherSubjectForm.value);
    const teacherObj = this.teacherSubjectForm.value;
    if (this.teacherSubjectForm.valid) {
      this.http.postData('master/saveTeacherSubjects', teacherObj)
      .subscribe(async (response: any) => {
        if (response) {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Subjects has entered sucessfully!',
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.teacherSubjectForm.reset();
                this.location.back();
              }
            }]
          });
          await alert.present();
        }
      }, async (error) => {
        if (error) {
          const alert = await this.alertController.create({
            header: 'Alert',
            message: error.error.message,
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }
  }
}
