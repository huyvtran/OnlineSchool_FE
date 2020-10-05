import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SideNavPageRoutingModule } from './side-nav-routing.module';
import { SideNavPage } from './side-nav.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideNavPageRoutingModule,
    SharedModule
  ],
  exports: [
    SideNavPage
  ],
  declarations: [SideNavPage]
})
export class SideNavPageModule {}
