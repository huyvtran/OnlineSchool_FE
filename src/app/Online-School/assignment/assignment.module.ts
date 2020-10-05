import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonButton } from '@ionic/angular';

import { AssignmentPageRoutingModule } from './assignment-routing.module';

import { AssignmentPage } from './assignment.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignmentPageRoutingModule,
    SharedModule,
   
  ],
  declarations: [AssignmentPage]
})
export class AssignmentPageModule {}
