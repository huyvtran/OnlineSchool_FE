import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
const { Network } = Plugins;
const { Geolocation } = Plugins;
@Component({
  selector: 'app-mpin',
  templateUrl: './mpin.page.html',
  styleUrls: ['./mpin.page.scss'],
})
export class MpinPage implements OnInit {
  mpinForm: FormGroup;
  uuid: string;
  isNetworkConnected: boolean;
  userName: string;
  isLoading: boolean = false;
  status;
  loginid: any;
  username: any;
  message: any;
  isAuthenticated: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private toastController: ToastController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.mpinForm = this.formBuilder.group({
      otp1: this.formBuilder.control('', [Validators.required]),
      otp2: this.formBuilder.control('', [Validators.required]),
      otp3: this.formBuilder.control('', [Validators.required]),
      otp4: this.formBuilder.control('', [Validators.required]),
    });
  }

  otpcontroller(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
  }

  ionViewDidEnter(): void {
    this.mpinForm.reset();
    this.message = '';
    Device.getInfo().then((deviceInfo) => {
      /*  console.log(deviceInfo); */
      this.uuid = deviceInfo.uuid;
      this.getMobileNumberwithUuid();
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
    this.presentToast(message);
  }
  getMobileNumberwithUuid() {
    this.http
      .postData('auth/checkuuid', { uuid: this.uuid })
      .subscribe((response) => {
        const loginResponse: any = response.body;
        this.status = loginResponse.ismpin;
        if (this.status === true) {
          this.username = loginResponse.username;
          this.userName = 'Welcome ' + this.username;
        } else {
          this.router.navigate(['/auth/login']);
        }
      });
  }
  onSubmit() {
    console.log(this.mpinForm.value);
    const obj = {
      /*   mpin: this.mpinForm.value.mpin, */
      otp1: this.mpinForm.value.otp1,
      otp2: this.mpinForm.value.otp2,
      otp3: this.mpinForm.value.otp3,
      otp4: this.mpinForm.value.otp4,
      uuid: this.uuid,
    };

    if (this.mpinForm.valid) {
      if (this.isNetworkConnected === false) {
        this.getInternetStatus();
      } else {
        this.isLoading = true;
        this.http.postData('auth/loginWithMpin', obj).subscribe((response) => {
          const loginResponse: any = response.body;
          this.message = loginResponse.message;
          this.isAuthenticated = loginResponse.isAuthenticated;
          if (loginResponse.isAuthenticated === true && loginResponse.isNewlogin === false) {
            this.dataStorageService.storeLoginData(loginResponse);
            if (loginResponse.accesslevelid === '1' && loginResponse.groupid === '2') {
              this.router.navigate(['/online-school/select-curriculum']);
            } else if (loginResponse.accesslevelid === '1' && loginResponse.groupid === '3') {
              this.router.navigate(['/online-school/activity']);
            } else if (loginResponse.accesslevelid === '2' && loginResponse.groupid === '2') {
              this.router.navigate(['/online-school/dashboard']);
            } else if (loginResponse.accesslevelid === '1' && loginResponse.groupid === '1') {
              this.router.navigate(['/online-school/dashboard']);
            }
            this.mpinForm.reset();
          } else  if (loginResponse.isAuthenticated === true && loginResponse.isNewlogin === true) {
            this.dataStorageService.storeLoginData(loginResponse);
            this.router.navigate(['/auth/otp']);
            this.mpinForm.reset();
          }
        });
      }
    }
  }

  async getGeoLoc() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
  }

  async presentToast(alertMessage) {
    const toast = await this.toastController.create({
      message: alertMessage,
      duration: 5000,
      color: 'danger',
    });
    toast.present();
  }
}
