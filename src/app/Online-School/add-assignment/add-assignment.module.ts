import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddAssignmentPageRoutingModule } from './add-assignment-routing.module';
import { AddAssignmentPage } from './add-assignment.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAssignmentPageRoutingModule,
    SharedModule
  ],
  declarations: [AddAssignmentPage]
})
export class AddAssignmentPageModule {}
