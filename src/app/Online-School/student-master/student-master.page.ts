import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-student-master',
  templateUrl: './student-master.page.html',
  styleUrls: ['./student-master.page.scss'],
})
export class StudentMasterPage implements OnInit {
  salutationData = ['Mr.', 'Ms.', 'Mrs.'];
  genderData = [{id: 1, name: 'Male'}, {id: 2, name: 'Female'}];
  studentMasterForm: FormGroup;
  studentData: any;
  instTypeId: any;
  instId: any;
  instCurID: any;
  classId: any;
  instSecId: any;
  instCurClassId: any;
  currId: any;
  disablesubmit: boolean = false;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private location: Location,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    //this.instTypeId = this.dataStorage.getDetails().INSTTYPEID;
    this.instId = this.dataStorage.getDetails().instId;
    this.currId = this.dataStorage.getDetails().currId;
    this.instCurID = this.dataStorage.getDetails().instCurID;
    this.classId = this.dataStorage.getDetails().classId;
    this.instCurClassId = this.dataStorage.getDetails().instCurClassId;
    this.instSecId = this.dataStorage.getDetails().instSecId;
   // alert(this.currId);
    this.studentMasterForm = this.formBuilder.group({
      instId:  this.instId,
      instCurrId: this.instCurID,
      instCurClassId: this.instCurClassId,
      currId: this.currId,
      classId: this.classId,
      instSecId: this.instSecId,
      salutation: this.formBuilder.control(''),
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      gender: this.formBuilder.control(1),
      mobileNo: this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]*'),
      Validators.maxLength(10)]),
      emailId: this.formBuilder.control(''),
      rollNo: this.formBuilder.control(''),
      instRollNumber: this.formBuilder.control(''),
      Age: this.formBuilder.control(''),
      fatherId: this.formBuilder.control(''),
      fatherSalutation: this.formBuilder.control(''),
      fatherFirstName: this.formBuilder.control(''),
      fatherLastName: this.formBuilder.control(''),
      fatherMobileNo: this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]*'),
        Validators.maxLength(10)]),
      motherId: this.formBuilder.control(''),
      motherSaluation: this.formBuilder.control(''),
      motherFirstName: this.formBuilder.control(''),
      motherLastName: this.formBuilder.control(''),
      motherMobileNo: this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]*'),
      Validators.maxLength(10)]),
      modifyFlag: this.formBuilder.control(false),
    });
  }
 
  saveStudentMaster() {
   this.disablesubmit = true
    if (this.studentMasterForm.valid) {
      console.log(this.studentMasterForm.value);
      this.studentMasterForm.patchValue({
        instRollNumber: this.instId + this.studentMasterForm.get('rollNo').value,
      })
     //$("#saveStudentMaster").attr('disabled', true); 
      this.http.postData('master/saveStudentMaster', this.studentMasterForm.value)
      .subscribe(async (response: any) => {
        this.disablesubmit = false
       // $("#saveStudentMaster").attr('disabled', false); 
        if (response) {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Student has created sucessfully!',
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.studentMasterForm.reset();
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
  studentResetForm() {
    this.studentMasterForm.reset()
  }
}
