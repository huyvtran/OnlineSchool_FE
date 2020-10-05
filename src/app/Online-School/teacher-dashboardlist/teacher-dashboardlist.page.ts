import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-dashboardlist',
  templateUrl: './teacher-dashboardlist.page.html',
  styleUrls: ['./teacher-dashboardlist.page.scss'],
})
export class TeacherDashboardlistPage implements OnInit {
  statusList: { id: number; status: string; checked: boolean; }[];
  curriculumForm: FormGroup;
  currculims: any;
  classes: any;
  sections: any;
  teacher: any;
  instId: string;
  teacherId: string;
  mobileno: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataService: DataStorageService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.instId = this.dataService.instId;
    this.teacherId = this.dataService.teacherid;
    this.mobileno = this.dataService.mobileno;
    this.statusList = [
      { id: 0, status: 'Videos', checked: true },
      { id: 1, status: 'Assignments', checked: false },
    ];
    this.getDefaultDetails();
    this.getteachersData();
  }
  getDefaultDetails() {
    this.curriculumForm = this.formBuilder.group({
      curid: this.formBuilder.control('',[Validators.required]),
      classid: this.formBuilder.control('',[Validators.required]),
      secid: this.formBuilder.control('',[Validators.required]),
      teacherId: this.formBuilder.control('',[Validators.required]),
      type: this.formBuilder.control(0,[Validators.required]),
    });
  }
  getteachersData() {
    const obj = {
      instId:   this.instId
    };
    this.http.postData('principal/getTeachersByInstId', obj)
    .subscribe((response: any) => {
      this.teacher = response.body; 
    });
  }

  getCurriculumData(MOBILENO) {
    const obj = {
      mobileno :MOBILENO
    };
    this.http.postData('teacher/getCurriculumDetails', obj)
    .subscribe((response: any) => {
      this.currculims = response.body;
    });
  }

  getClassesData(INSTCURID,TEACHERID) {
    const obj = {
      teacherId:  TEACHERID,
      instCurrId: INSTCURID
    };
    this.http.postData('teacher/getClassDetails', obj)
    .subscribe((response: any) => {
      this.classes = response.body;
    });
  }
  getSectionsData(INSTCURCLASSID,TEACHERID) {
    const obj = {
      instCurrClassId :  INSTCURCLASSID,
      teacherId: TEACHERID
    };
    this.http.postData('teacher/getSectionDetails', obj)
    .subscribe((response: any) => {
      this.sections = response.body; 
    });
  }
 
  async onSubmit() {
    console.log(this.curriculumForm.value);
    if(this.curriculumForm.valid) {
      const obj = {
        curid: this.curriculumForm.get('curid').value,
        classid: this.curriculumForm.get('classid').value,
        secid: this.curriculumForm.get('secid').value,
        teacherId: this.curriculumForm.get('teacherId').value,
        type: this.curriculumForm.get('type').value
      };
      this.dataService.storeDetails(obj);
      this.router.navigate(['/online-school/teacher-dashboard']);
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Failed',
        message: 'Please select valid data.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  

}
