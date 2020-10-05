import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MpinPageRoutingModule } from './mpin-routing.module';

import { MpinPage } from './mpin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MpinPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MpinPage]
})
export class MpinPageModule {}
