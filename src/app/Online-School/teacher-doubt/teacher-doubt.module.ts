import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDoubtPageRoutingModule } from './teacher-doubt-routing.module';

import { TeacherDoubtPage } from './teacher-doubt.page';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherDoubtPageRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  declarations: [TeacherDoubtPage]
})
export class TeacherDoubtPageModule {}
