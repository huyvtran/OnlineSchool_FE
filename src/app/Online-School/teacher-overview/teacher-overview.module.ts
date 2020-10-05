import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherOverviewPageRoutingModule } from './teacher-overview-routing.module';

import { TeacherOverviewPage } from './teacher-overview.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherOverviewPageRoutingModule,
    SharedModule,
    GoogleChartsModule
  ],
  declarations: [TeacherOverviewPage]
})
export class TeacherOverviewPageModule {}
