import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDashboardlistPageRoutingModule } from './teacher-dashboardlist-routing.module';

import { TeacherDashboardlistPage } from './teacher-dashboardlist.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherDashboardlistPageRoutingModule,
    SharedModule
  ],
  declarations: [TeacherDashboardlistPage]
})
export class TeacherDashboardlistPageModule {}
