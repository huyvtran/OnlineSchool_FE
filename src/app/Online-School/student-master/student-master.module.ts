import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentMasterPageRoutingModule } from './student-master-routing.module';
import { StudentMasterPage } from './student-master.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentMasterPageRoutingModule,
    SharedModule
  ],
  declarations: [StudentMasterPage]
})
export class StudentMasterPageModule {}
