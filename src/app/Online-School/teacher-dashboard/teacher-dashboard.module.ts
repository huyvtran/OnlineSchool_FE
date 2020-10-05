import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDashboardPageRoutingModule } from './teacher-dashboard-routing.module';

import { TeacherDashboardPage } from './teacher-dashboard.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherDashboardPageRoutingModule,
    SharedModule,
    GoogleChartsModule
  ],
  declarations: [TeacherDashboardPage]
})
export class TeacherDashboardPageModule {}
