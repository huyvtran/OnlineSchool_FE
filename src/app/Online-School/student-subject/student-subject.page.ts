import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.page.html',
  styleUrls: ['./student-subject.page.scss'],
})
export class StudentSubjectPage implements OnInit {
  studentSubjectForm: FormGroup;
  InstitueData: any;
  InstitueNameData: any;
  http: any;
  subjectBySectionData: any;
  studentNameData: any[];
  classCirriculumData: any;
  cirriclumInstitueData: any[];
  sectionByClassData: any;
  constructor(private formBuilder: FormBuilder,
    private httpservice: HttpService,
    private location: Location,
    private alertController: AlertController) { }

  ngOnInit() {
    this.studentSubjectForm = this.formBuilder.group({
      CURRID: this.formBuilder.control(''),
      STUDENTID: this.formBuilder.control(''),
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
  this.httpservice
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
  this.httpservice
    .postData('master/loadInstitutesByInstituteType', obj)
    .subscribe((InstitueNameData: any) => {
      if (InstitueNameData.body.length > 0) {
        this.InstitueNameData = InstitueNameData.body;
      } else {
        this.InstitueNameData = [];
      }
    });
}
getstudentByInstitue(instId: string) {
  const obj = {
    INSTID: instId,
  };
  this.httpservice
    .postData('master/loadStudentsByInstitute', obj)
    .subscribe((teacherNameData: any) => {
      if (teacherNameData.body.length > 0) {
        this.studentNameData = teacherNameData.body;
      } else {
        this.studentNameData = [];
      }
    });
}
getSubjectBySection(currId: number) {
  const obj = {
    CURRID: currId,
  };
  this.httpservice
    .postData('master/loadSubjectsByCurriculum', obj)
    .subscribe((subjectBySectionData: any) => {
      if (subjectBySectionData.body.length > 0) {
        this.subjectBySectionData = subjectBySectionData.body;
      } else {
        this.subjectBySectionData = [];
      }
    });
  }
  getCirriculumData(instId: string) {
    const obj = {
      INSTID: instId,
    };
    this.httpservice
      .postData('master/loadCurriculumByInstitute', obj)
      .subscribe((cirriclumInstitueData: any) => {
        if (cirriclumInstitueData.body.length > 0) {
          this.cirriclumInstitueData = cirriclumInstitueData.body;
        } else {
          this.cirriclumInstitueData = [];
        }
      });
  }
  getSectionByClass(instCurClassId: string) {
    this.studentSubjectForm.patchValue({INSTCURCLASSID: instCurClassId});
    const obj = {
      INSTCURCLASSID: instCurClassId,
    };
    this.httpservice
      .postData('master/loadSectionByClassesAndCurriculumAndInstitute', obj)
      .subscribe((sectionByClassData: any) => {
        if (sectionByClassData.body.length > 0) {
          this.sectionByClassData = sectionByClassData.body;
        } else {
          this.sectionByClassData = [];
        }
      });
  }
  getClassFromCirriculum(instCurId: string) {
    this.studentSubjectForm.patchValue({INSTCURID: instCurId});
    const obj = {
      INSTCURID: instCurId,
    };
    this.httpservice
      .postData('master/loadClassesByCurriculumAndInstitute', obj)
      .subscribe((classCirriculumData: any) => {
        if (classCirriculumData.body.length > 0) {
          this.classCirriculumData = classCirriculumData.body;
        } else {
          this.classCirriculumData = [];
        }
      });
  }
  patchToTeachersForm(instCurrClassSecId: string) {
    this.studentSubjectForm.patchValue({
      INSTCURCLASSSECID : instCurrClassSecId
    });
  }
saveStudentSubject() {
  console.log('teacher subject form ====> ', this.studentSubjectForm.value);
  const studentObj = this.studentSubjectForm.value;
  if (this.studentSubjectForm.valid) {
    this.httpservice.postData('master/saveStudentSubjects', studentObj)
    .subscribe(async (response: any) => {
      if (response) {
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Subjects has entered sucessfully!',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.studentSubjectForm.reset();
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

subjectResetForm() {
  this.studentSubjectForm.reset()
}
}
