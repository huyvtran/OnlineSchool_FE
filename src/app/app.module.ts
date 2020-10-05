import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './Auth/auth-routing/auth-routing.module';
import { OnlineSchoolRoutingModule } from './Online-School/online-school-routing/online-school-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/http/http.service';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpenPdfPageModule } from './Online-School/reading-lesson/open-pdf/open-pdf.module';
import { SideNavPageModule } from './Online-School/side-nav/side-nav.module';
import { VideosListPageModule } from './Online-School/add-video/videos-list/videos-list.module';
import { StudentResultPageModule } from './Online-School/student-result/student-result.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    OnlineSchoolRoutingModule,
    BrowserAnimationsModule,
    OpenPdfPageModule,
    SideNavPageModule,
    VideosListPageModule,
    StudentResultPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpService,
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
