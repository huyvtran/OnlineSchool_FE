import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpService } from 'src160820/src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';

@Component({
  selector: 'app-studentmaster-curriculum',
  templateUrl: './studentmaster-curriculum.page.html',
  styleUrls: ['./studentmaster-curriculum.page.scss'],
})
export class StudentmasterCurriculumPage implements OnInit {
  studentForm: FormGroup;
  InstitueData: any[];
  InstitueNameData: any;
  sections: any;
  classes: any;
  currculims: any;
  instId: string;
  classId: any;
  currId: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.instId = this.dataStorage.instId;
    this.studentForm = this.formBuilder.group({
      INSTTYPEID: this.formBuilder.control('',[Validators.required]),
      instId: this.formBuilder.control('',[Validators.required]),
      curid: this.formBuilder.control('',[Validators.required]),
      classid:this.formBuilder.control('',[Validators.required]),
      secid:this.formBuilder.control('',[Validators.required]),
      classId: this.formBuilder.control(''),
      currId: this.formBuilder.control('')

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

  getCurriculumData(INSTID) {
    const obj = {
      instId:  INSTID
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
  getSectionsData(INSTCURCLASSID,CLASSID,CURRID) {
    this.classId = CLASSID
    this.currId = CURRID
    this.studentForm.patchValue({
      classId : CLASSID,
      currId: CURRID
    })
    const obj = {
      instCurClassId :  INSTCURCLASSID
    };
    this.http.postData('principal/getsectionsByInstCurClassId', obj)
    .subscribe((response: any) => {
      this.sections = response.body; 
    });
  }
  onSubmit() {
    if(this.studentForm.valid) {
      const obj = {
        INSTTYPEID : this.studentForm.get('INSTTYPEID').value,
        instId : this.studentForm.get('instId').value,
        instCurID : this.studentForm.get('curid').value,
        instCurClassId:this.studentForm.get('classid').value,
        instSecId: this.studentForm.get('secid').value,
        classId: this.classId,
        currId:  this.currId
      }
      console.log(obj);
      this.dataStorage.storeDetails(obj);
      this.router.navigate(['/online-school/student-master'])
    }
  }
}
