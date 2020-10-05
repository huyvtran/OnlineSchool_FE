import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaisingDoubtPageRoutingModule } from './raising-doubt-routing.module';

import { RaisingDoubtPage } from './raising-doubt.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
// import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaisingDoubtPageRoutingModule,
    SharedModule
  ],
  declarations: [RaisingDoubtPage]
})
export class RaisingDoubtPageModule {}
