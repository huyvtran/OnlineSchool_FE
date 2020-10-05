import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http/http.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController
  ) {}

  ngOnInit() {}
  navigatetoprincipalcurriculum() {
    //this.router.navigate(['/online-school/principal-curriculum']);
    this.router.navigate(['/online-school/principal-overview']);
  }
  navigatetostudentdashboardlist() {
    this.router.navigate(['/online-school/student-dashboardlist']);
  }
  navigatetoteacherdashboard() {
    this.router.navigate(['/online-school/teacher-dashboardlist']);
  }
}
