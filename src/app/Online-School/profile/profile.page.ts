import { Component, OnInit } from '@angular/core';
import {
  MenuController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  studentid: string;
  teacherId: string;
  instituteid: string;
  profiledata: any;
  ProfileForm: FormGroup;
  userName: any;
  accesslevelid: string;
  groupid: string;
  mobileno: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private toastController: ToastController,
    private menuController: MenuController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.studentid = this.dataStorageService.studentid;
    this.instituteid = this.dataStorageService.instId;
    this.teacherId = this.dataStorageService.teacherid;
    this.userName = this.dataStorageService.userName;
    this.accesslevelid = this.dataStorageService.accesslevelid;
    this.groupid = this.dataStorageService.groupid;
    this.mobileno = this.dataStorageService.mobileno;
    this.loaddata();
    this.ProfileForm = this.formBuilder.group({
      studentname: this.formBuilder.control(''),
      rollno: this.formBuilder.control(''),
      institutename: this.formBuilder.control(''),
      class: this.formBuilder.control(''),
      section: this.formBuilder.control(''),
      teachername: this.formBuilder.control(''),
      mobilenumber: this.formBuilder.control(''),
      teacherInstitue: this.formBuilder.control(''),
    });
  }
  loaddata() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      const obj = {
        id: this.teacherId,
        logintype: 2,
      };
      this.http.postData('auth/getdatalogintype', obj).subscribe((response) => {
        this.profiledata = response.body;
        console.log(response);
        this.ProfileForm.patchValue({
          teachername: this.userName,
          teacherInstitue: this.profiledata.institutename,
          mobilenumber: this.mobileno,
        });
      });
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      const obj = {
        id: this.studentid,
        logintype: 1,
      };
      this.http.postData('auth/getdatalogintype', obj).subscribe((response) => {
        this.profiledata = response.body;
        console.log(response);
        this.ProfileForm.patchValue({
          institutename: this.profiledata.institutename,
          rollno: this.profiledata.rollno,
          class: this.profiledata.class,
          section: this.profiledata.section,
          studentname: this.userName,
        });
      });
    }

    /*   const obj = {
      id: this.studentid,
      logintype: 1
    };
    this.http.postData('auth/getdatalogintype', obj)
      .subscribe(response => {
        this.profiledata = response.body;
        console.log(response);
        this.ProfileForm.patchValue({
          institutename:  this.profiledata.institutename, 
          rollno:  this.profiledata.rollno, 
          class:  this.profiledata.class, 
          section:  this.profiledata.section, 
          studentname: this.userName
        })
      }); */
  }
}
