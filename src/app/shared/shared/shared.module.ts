import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggleModule,
    GoogleChartsModule,
  ],
  exports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggleModule,
    GoogleChartsModule
  ]
})
export class SharedModule { }
