import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.page.html',
  styleUrls: ['./side-nav.page.scss'],
})
export class SideNavPage implements OnInit {
  answerdata: object;
  userName;

  constructor(
    public dataStorage: DataStorageService,
    private menuController: MenuController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  loadprofilescreen() {
    this.menuController.close();
    this.router.navigate(['/online-school/profile']);
  }

  loadchangepassword() {
    this.menuController.close();
    this.router.navigate(['/auth/change-password']);
  }

  loadFAQ() {
    this.menuController.close();
    this.router.navigate(['/online-school/faq']);
  }

  loadTeacherSubjects() {
    this.menuController.close();
    this.router.navigate(['/online-school/teacher-subject']);
  }

  loadTeacherMaster() {
    this.menuController.close();
    this.router.navigate(['/online-school/teacher-master']);
  }
  loadStudentMaster() {
    this.menuController.close();
    this.router.navigate(['/online-school/studentmaster-curriculum']);
  }
  loadStudentSubects() {
    this.menuController.close();
    this.router.navigate(['/online-school/student-subject']);
  }
  async logout() {
    this.menuController.close();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Are you sure, you want to logout ?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
        }, {
          text: 'YES',
          handler: () => {
            this.router.navigate(['/']);
            this.dataStorage.logout();
          }
        }
      ]
    });
    await alert.present();
  }
}
