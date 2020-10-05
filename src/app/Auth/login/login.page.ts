import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { ToastController, MenuController } from '@ionic/angular';
const { Device } = Plugins;
const { Network } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  uuid: string;
  isNetworkConnected: boolean;
  mobilenumber: string;
  username;
  userName: string;
  message: any;
  isAuthenticated: any;
  status: any;
  constructor(private formBuilder: FormBuilder,
              private http: HttpService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private toastController: ToastController,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.loginForm = this.formBuilder.group({
      loginid: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      uuid: this.formBuilder.control('')
    });

  }

  ionViewDidEnter() {
    this.message = ''
    this.loginForm.reset();

    Device.getInfo()
    .then(deviceInfo => {
      this.uuid = deviceInfo.uuid;
      this.loginForm.patchValue({
        uuid: this.uuid
      });
      this.getMobileNumberwithUuid();
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
    this.presentToast(message);
  }

  getMobileNumberwithUuid() {
    this.http.postData('auth/checkuuid', {uuid: this.uuid})
      .subscribe(response => {
        const loginResponse: any = response.body;
        this.status = loginResponse.ismpin;
        this.username = loginResponse.username;
        this.userName = 'Welcome ' + this.username;
        /* if (this.status === true) {
          this.router.navigate(['/auth/mpin']);
        } else {
          this.router.navigate(['/auth/login']);
        } */
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.isNetworkConnected === false) {
        this.getInternetStatus();
      } else {
        this.http.postData('auth/loginUser', this.loginForm.value)
        .subscribe(response => {
          const loginResponse: any = response.body;
          this.message = loginResponse.message;
          this.isAuthenticated = loginResponse.isAuthenticated;
          if (loginResponse.isAuthenticated === true && loginResponse.isNewlogin === false) {
            this.dataStorageService.storeLoginData(loginResponse);
            if (loginResponse.accesslevelid === '1' && loginResponse.groupid === '2') {
              this.router.navigate(['/online-school/select-curriculum']);
            } else if (loginResponse.accesslevelid === '1' && loginResponse.groupid === '3') {
              this.router.navigate(['/online-school/activity']);
            }  else if (loginResponse.accesslevelid === '2' && loginResponse.groupid === '2') {
              this.router.navigate(['/online-school/dashboard']);
            }  else if (loginResponse.accesslevelid === '1' && loginResponse.groupid === '1') {
              this.router.navigate(['/online-school/dashboard']);
            }
            this.loginForm.reset();
          } else  if (loginResponse.isAuthenticated === true && loginResponse.isNewlogin === true) {
            this.dataStorageService.storeLoginData(loginResponse);
            this.router.navigate(['/auth/otp']);
            this.loginForm.reset();
          }
        });
      }
    } else {
      let errorMessage;
      errorMessage = 'Mobile Number or Password is Incorrect!';
    }
  }

async presentToast(alertMessage) {
  const toast = await this.toastController.create({
    message: alertMessage,
    duration: 2500,
    color: 'danger'
  });
  toast.present();
}
}
