import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import {
  ToastController,
  MenuController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otpForm: FormGroup;
  registrationObj;
  mobilenumber: any;
  disableGenerate = true;
  loginid;
  mobileno;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private toastController: ToastController,
    private menuCtrl: MenuController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.otpForm = this.formBuilder.group({
      otp1: this.formBuilder.control('', [
        Validators.pattern('[0-9]*'),
        Validators.required,
      ]),
      otp2: this.formBuilder.control('', [
        Validators.pattern('[0-9]*'),
        Validators.required,
      ]),
      otp3: this.formBuilder.control('', [
        Validators.pattern('[0-9]*'),
        Validators.required,
      ]),
      otp4: this.formBuilder.control('', [
        Validators.pattern('[0-9]*'),
        Validators.required,
      ]),
    });

    this.mobileno = this.dataStorageService.mobileno;
    this.loginid = this.dataStorageService.userloginid;
    this.sendOTP();
    setTimeout(() => {
      this.disableGenerate = !this.disableGenerate;
    }, 30000);
  }

  /*  ionViewDidEnter() {
    this.mobileno = this.dataStorageService.mobileno;
    alert(this.dataStorageService.mobileno);
      this.loginid = this.dataStorageService.userloginid;
      alert(this.loginid + '66')
      this.sendOTP();
      setTimeout(() => {
        this.disableGenerate = !this.disableGenerate;
      }, 30000);
  } */
  otpcontroller(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
  }
  verifyOTP() {
    console.log(this.otpForm.value);
    if (this.otpForm.valid) {
      const obj = {
        otp1: this.otpForm.value.otp1,
        otp2: this.otpForm.value.otp2,
        otp3: this.otpForm.value.otp3,
        otp4: this.otpForm.value.otp4,
        mobilenumber: this.mobileno,
        purpose: 'otp verfication for login',
        loginid: this.loginid,
      };
      this.http.postData('auth/verifyOTP', obj).subscribe(async (response) => {
        const respObj: any = response.body;
        const status = respObj.status;
        if (status === true) {
          this.router.navigate(['/auth/change-password']);
        } else {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Failed',
            message: 'Invalid OTP.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    }
  }

  generateOTP() {
    this.sendOTP();
    this.disableGenerate = !this.disableGenerate;
    setTimeout(() => {
      this.disableGenerate = !this.disableGenerate;
    }, 30000);
  }

  sendOTP() {
    const obj = {
      mobilenumber: this.mobileno,
      purpose: 'otp verfication for login',
      loginid: this.loginid,
    };
    this.http.postData('auth/generateOTP', obj).subscribe((response) => {
      console.log(response);
    });
  }

  resendOTP() {
    const obj = {
      mobilenumber: this.mobileno,
      purpose: 'otp verfication for login',
      loginid: this.loginid,
    };
    this.http.postData('auth/resendOTP', obj).subscribe((response) => {
      console.log(response);
    });
  }
}
