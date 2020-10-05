import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboardlistPageRoutingModule } from './student-dashboardlist-routing.module';

import { StudentDashboardlistPage } from './student-dashboardlist.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboardlistPageRoutingModule,
    SharedModule
  ],
  declarations: [StudentDashboardlistPage]
})
export class StudentDashboardlistPageModule {}
