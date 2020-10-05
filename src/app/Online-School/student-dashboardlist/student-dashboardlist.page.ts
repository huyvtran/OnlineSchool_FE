import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-dashboardlist',
  templateUrl: './student-dashboardlist.page.html',
  styleUrls: ['./student-dashboardlist.page.scss'],
})
export class StudentDashboardlistPage implements OnInit {
  statusList: { id: number; status: string; checked: boolean; }[];
  currculims: any;
  classes: any;
  sections: any;
  student: any;
  instId: string;
  curriculumForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataService: DataStorageService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.instId = this.dataService.instId;
    this.statusList = [
      { id: 0, status: 'Videos', checked: true },
      { id: 1, status: 'Assignments', checked: false },
    ];
    this.getDefaultDetails();
    this.getCurriculumData();
 
  }
  getDefaultDetails() {
    this.curriculumForm = this.formBuilder.group({
      curid: this.formBuilder.control('',[Validators.required]),
      classid: this.formBuilder.control('',[Validators.required]),
      secid: this.formBuilder.control('',[Validators.required]),
      stuid: this.formBuilder.control('',[Validators.required]),
      type: this.formBuilder.control(0,[Validators.required]),
    });
  }
  
  getCurriculumData() {
    const obj = {
      instId:   this.instId
    };
    this.http.postData('principal/getCurriculumByInstId', obj)
    .subscribe((response: any) => {
      this.currculims = response.body;
    });
  }

  getClassesData(INSTCURID) {
    const obj = {
      instCurId:   INSTCURID
    };
    this.http.postData('principal/getClassesByInstCurId', obj)
    .subscribe((response: any) => {
      this.classes = response.body;
    });
  }
  getSectionsData(INSTCURCLASSID) {
    const obj = {
      instCurClassId :  INSTCURCLASSID
    };
    this.http.postData('principal/getsectionsByInstCurClassId', obj)
    .subscribe((response: any) => {
      this.sections = response.body; 
    });
  }
  getStudentData(INSTCURCLASSSECID) {
    const obj = {
      instCurClassSecId :   INSTCURCLASSSECID
    };
    this.http.postData('principal/getStudentsByInstCurClassSecId', obj)
    .subscribe((response: any) => {
      this.student = response.body; 
    });
  }
  async onSubmit() {
    console.log(this.curriculumForm.value);
    if(this.curriculumForm.valid) {
      const obj = {
        instid: this.instId,
        curid: this.curriculumForm.get('curid').value,
        classid: this.curriculumForm.get('classid').value,
        secid: this.curriculumForm.get('secid').value,
        stuid: this.curriculumForm.get('stuid').value,
        type: this.curriculumForm.get('type').value
      };
      this.dataService.storeDetails(obj);
      this.router.navigate(['/online-school/student-dashboard']);
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
