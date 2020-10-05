import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-curriculum',
  templateUrl: './principal-curriculum.page.html',
  styleUrls: ['./principal-curriculum.page.scss'],
})
export class PrincipalCurriculumPage implements OnInit {
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
  statusList: { id: number; status: string; checked: boolean; }[];
  status: any;
  classes: any;
  currculims: any;
  sections: any;

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
    //this.getSalutation();
    this.getDefaultDetails();
    this.getCurriculumData();
    //this.loadinstitutename();
    this.statusList = [
      { id: 1, status: 'Videos', checked: true },
      { id: 2, status: 'Assignments', checked: false },
    ];
  }

  getDefaultDetails() {
    this.curriculumForm = this.formBuilder.group({
      curid: this.formBuilder.control('',[Validators.required]),
      classid: this.formBuilder.control('',[Validators.required]),
      secid: this.formBuilder.control('',[Validators.required]),
      type: this.formBuilder.control('',[Validators.required]),
    });
  }

  getCurriculumData() {
    const obj = {
      instid:   this.instId
    };
    this.http.postData('principal/getcurculimclassesdata', obj)
    .subscribe((response: any) => {
      this.classes = response.body.classes;
      this.currculims = response.body.currculims;
      this.sections = response.body.sections;
     /*  if (curriculumData.body.length > 0) {
       
      } else {
        this.curriculumData = [];
      } */
    });
  }
/*   getCurriculumData() {
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
  } */

 

  getSectionHighlighted(instCurrClassSecId: string, index: number) {
    this.disablebutton = true;
    this.curriculumForm.patchValue({
      instCurrClassSecId
    });
  }

  async onSubmit() {
    console.log(this.curriculumForm.value);
    // if(this.curriculumForm.valid) {
    const obj = {
        instid: this.instId,
        curid: this.curriculumForm.get('curid').value,
        classid: this.curriculumForm.get('classid').value,
        secid: this.curriculumForm.get('secid').value,
        type: this.curriculumForm.get('type').value
      };
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/principal-overview']);
    // } 
    /* else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Failed',
        message: 'Please select valid data.',
        buttons: ['OK']
      });
      await alert.present();
    } */
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
