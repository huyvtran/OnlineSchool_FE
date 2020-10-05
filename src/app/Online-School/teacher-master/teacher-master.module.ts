import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherMasterPageRoutingModule } from './teacher-master-routing.module';

import { TeacherMasterPage } from './teacher-master.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherMasterPageRoutingModule,
    SharedModule
  ],
  declarations: [TeacherMasterPage]
})
export class TeacherMasterPageModule {}
