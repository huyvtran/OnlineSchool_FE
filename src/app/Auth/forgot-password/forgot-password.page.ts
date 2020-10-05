import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import {
  MenuController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
const { Network } = Plugins;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  showPasswordErrMsg: boolean;
  showmPINErrMsg: boolean;
  uuid: string;
  isNetworkConnected: boolean;
  mobilenumber: any;
  username: any;
  userName: string;
  mobileno: any;
  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private http: HttpService,
    private dataStorage: DataStorageService,
    public alertController: AlertController,
    private router: Router,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.loadForgotPasswordForm();
    this.mobileno = this.dataStorageService.mobileno;
  }
  loadForgotPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      uuid: this.formBuilder.control(''),
      loginid: this.formBuilder.control(''),
      //mobilenumber: this.formBuilder.control('', [Validators.required]),
    });
  }

  ionViewDidEnter() {
    Device.getInfo().then((deviceInfo) => {
      this.uuid = deviceInfo.uuid;
      this.resetPasswordForm.patchValue({
        uuid: this.uuid,
      });
      /*  this.getMobileNumberwithUuid(); */
    });

    Network.addListener('networkStatusChange', (networkInfo) => {
      this.isNetworkConnected = networkInfo.connected;
      if (this.isNetworkConnected === false) {
        this.getInternetStatus();
      }
    });

    Network.getStatus().then((networkInfo) => {
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

  onSubmit(formDirective: FormGroupDirective) {
    console.log(this.resetPasswordForm.value);
    const obj = {
      loginid: this.resetPasswordForm.get('loginid').value,
      mobilenumber: this.mobileno,
    };
    if (this.resetPasswordForm.valid) {
      this.http
        .postDataWithnoToken('auth/resetPassword', obj)
        .subscribe(async (response) => {
          console.log(response);
          const loginResponse: any = response.body;
          if (loginResponse.status === true) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Success',
              message: 'Reset Password Successfully.',
              buttons: ['OK'],
            });
            await alert.present();
            this.router.navigate(['/auth/login']);
            this.resetPasswordForm.reset();
            formDirective.reset();
          } else {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Failed',
              message: 'Mobile Number or Password is Incorrect!',
              buttons: ['OK'],
            });
            await alert.present();
          }
        });
    } else {
    }
  }

  checkMobilenumberExistsorNot() {
    const mobileNumber: string = this.resetPasswordForm
      .get('mobileNumber')
      .value.toString();
    const obj = {
      mobilenumber: mobileNumber,
    };
    if (mobileNumber.length === 10) {
      return this.http.postData('auth/mobilenumberExistsorNot', obj);
    }
  }

  async presentToast(alertMessage, color) {
    const toast = await this.toastCtrl.create({
      message: alertMessage,
      duration: 2500,
      color,
    });
    toast.present();
  }
}
