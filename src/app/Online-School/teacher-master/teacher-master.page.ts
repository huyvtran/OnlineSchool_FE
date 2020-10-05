import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-master',
  templateUrl: './teacher-master.page.html',
  styleUrls: ['./teacher-master.page.scss'],
})
export class TeacherMasterPage implements OnInit {
  teacherMasterForm: FormGroup;
  InstitueData = [];
  InstitueNameData = [];
  teacherNameData = [];
  salutationData = ['Mr.', 'Ms.', 'Mrs.'];
  genderData = [{id: 1, name: 'Male'}, {id: 2, name: 'Female'}];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private location: Location,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.teacherMasterForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      instId: this.formBuilder.control(''),
      salutation: this.formBuilder.control(''),
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      gender: this.formBuilder.control(1),
      designation: this.formBuilder.control(''),
      mobileNo: this.formBuilder.control(''),
      emailId: this.formBuilder.control(''),
      isPrincipal: this.formBuilder.control(false),
      modifyFlag: this.formBuilder.control(false),
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

  saveTeacherMaster() {
    if (this.teacherMasterForm.valid) {
      console.log(this.teacherMasterForm.value);
      this.http.postData('master/saveTeacherMaster', this.teacherMasterForm.value)
      .subscribe(async (response: any) => {
        if (response) {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Teacher has created sucessfully!',
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.teacherMasterForm.reset();
                this.location.back();
              }
            }]
          });
          await alert.present();
        }
      }, async (error) => {
        if (error) {
          console.log(error);
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
