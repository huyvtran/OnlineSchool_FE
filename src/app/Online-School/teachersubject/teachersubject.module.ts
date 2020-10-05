import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeachersubjectPageRoutingModule } from './teachersubject-routing.module';

import { TeachersubjectPage } from './teachersubject.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeachersubjectPageRoutingModule,
    SharedModule
  ],
  declarations: [TeachersubjectPage]
})
export class TeachersubjectPageModule {}
