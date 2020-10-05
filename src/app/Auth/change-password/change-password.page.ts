import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
const { Network } = Plugins;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  showPasswordErrMsg: boolean = false;
  showmPINErrMsg: boolean = false;
  uuid: string;
  isNetworkConnected: boolean;
  mobilenumber: any;
  username: any;
  userName: string
  registrationObj: any;
  loginid: any;
  constructor( private menuCtrl: MenuController,
               private formBuilder: FormBuilder,
               private toastCtrl: ToastController,
               private http: HttpService,
               private dataStorage: DataStorageService,
               private router: Router) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.loadForgotPasswordForm();
    this.loginid = this.dataStorage.userloginid;
    this.changePasswordForm.patchValue({
      loginid : this.loginid
    })
  }
  loadForgotPasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      uuid: this.formBuilder.control(''),
      loginid: this.formBuilder.control(''),
      password: this.formBuilder.control('', [Validators.required]),
      confirmPassword: this.formBuilder.control('', [Validators.required]),
      mpin: this.formBuilder.control('',[Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(4),
          Validators.minLength(4),
        ]
      ),
      confirmMpin: this.formBuilder.control('',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(4),
          Validators.minLength(4),
        ]
      ),
    });
  }

  ionViewDidEnter() {
    Device.getInfo()
    .then(deviceInfo => {
      this.uuid = deviceInfo.uuid;
      this.changePasswordForm.patchValue({
        uuid: this.uuid
      });
     /*  this.getMobileNumberwithUuid(); */
    });

    Network.addListener('networkStatusChange', (networkInfo) => {
      this.isNetworkConnected = networkInfo.connected;
      if (this.isNetworkConnected === false) {
        this.getInternetStatus();
      }
    });

    Network.getStatus()
    .then(networkInfo => {
      this.isNetworkConnected = networkInfo.connected;
      if (this.isNetworkConnected === false) {
        this.getInternetStatus();
      }
    });
  }

  getInternetStatus() {
    const message = 'Internet connected required';
    this.presentToast(message, 'danger');
  }

 /*  getMobileNumberwithUuid() {
    this.http.postData('auth/getMobileNumberwithUuid', {uuid: this.uuid})
      .subscribe(response => {
        const loginResponse: any = response.body;
        this.mobilenumber = loginResponse.mobileNumber;
        this.username = loginResponse.userName;
        this.userName = 'Welcome ' + this.username;
        this.forgotPasswordForm.patchValue({
          mobileNumber: this.mobilenumber
        });
      });
  } */
  checkPassword() {
    const password: string = this.changePasswordForm.get('password').value;
    const confirmPassword: string = this.changePasswordForm.get('confirmPassword').value;
    if (confirmPassword.length > 0) {
      if (password === confirmPassword) {
        this.showPasswordErrMsg = false;
      } else {
        this.showPasswordErrMsg = true;
      }
    } else {
      this.showPasswordErrMsg = false;
    }
  }

  checkmPIN() {
    const mpin: number = this.changePasswordForm.get('mpin').value;
    const confirmMpin: number = this.changePasswordForm.get('confirmMpin').value;
    if (confirmMpin.toString().length > 0) {
      if (mpin === confirmMpin) {
        this.showmPINErrMsg = false;
      } else {
        this.showmPINErrMsg = true;
      }
    } else {
      this.showmPINErrMsg = false;
    }
  }
  onSubmit(formDirective: FormGroupDirective) {
    console.log(this.changePasswordForm.value)
    const  obj = {
        loginid : this.changePasswordForm.get('loginid').value,
        mpin : this.changePasswordForm.get('mpin').value,
        password : this.changePasswordForm.get('password').value,
         uuid: this.uuid
    }
    if(this.changePasswordForm.valid) {
      this.http.postDataWithnoToken('auth/changeuserpassword', obj)
      .subscribe(response => {
        console.log(response);
        const loginResponse: any = response.body;
        if (loginResponse.status === true) {
          this.router.navigate(['/auth/mpin']);
          this.changePasswordForm.reset();
        /*   formDirective.reset(); */
        } else {
          let errorMessage;
          errorMessage = 'Mobile Number or Password is Incorrect!';
        }
      });
    } else {
      
    }
  }

  checkMobilenumberExistsorNot() {
    const mobileNumber: string = this.changePasswordForm.get('mobileNumber').value.toString();
    const obj = {
      mobilenumber: mobileNumber
    };
    if (mobileNumber.length === 10) {
      return this.http.postData('auth/mobilenumberExistsorNot', obj);
    }
  }

  async presentToast(alertMessage, color) {
    const toast = await this.toastCtrl.create({
      message: alertMessage,
      duration: 2500,
      color
    });
    toast.present();
  }
}
