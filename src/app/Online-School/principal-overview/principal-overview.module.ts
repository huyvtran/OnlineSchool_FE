import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalOverviewPageRoutingModule } from './principal-overview-routing.module';

import { PrincipalOverviewPage } from './principal-overview.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalOverviewPageRoutingModule,
    SharedModule,
    GoogleChartsModule
  ],
  declarations: [PrincipalOverviewPage]
})
export class PrincipalOverviewPageModule {}
