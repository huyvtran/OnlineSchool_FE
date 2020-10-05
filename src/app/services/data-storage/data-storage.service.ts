import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  userName;
  loginid: string;
  mobileno;
  userloginid;
  studentid: string;
  teacherid: string;
  accesslevelid: string;
  groupid: string;
  instId: string;

  constructor( private cookieService: CookieService) { }

  RxSubject: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  storeLoginData(loginObj: any) {
    console.log('login obj', loginObj);
    this.cookieService.set('userloginid', loginObj.userloginid);
    this.cookieService.set('mobileno', loginObj.mobileno);
    this.cookieService.set('userName', loginObj.userName);
    this.cookieService.set('studentid', loginObj.studentid);
    this.cookieService.set('teacherid', loginObj.teacherid);
    this.cookieService.set('instId', loginObj.instituteid);
    this.cookieService.set('accesslevelid', loginObj.accesslevelid);
    this.cookieService.set('groupid', loginObj.groupid);

    this.userloginid = this.cookieService.get('userloginid');
    this.mobileno = this.cookieService.get('mobileno');
    this.studentid = this.cookieService.get('studentid');
    this.teacherid = this.cookieService.get('teacherid');
    this.instId = this.cookieService.get('instId');
    this.accesslevelid = this.cookieService.get('accesslevelid');
    this.groupid = this.cookieService.get('groupid');
    this.userName = this.cookieService.get('userName');
  }

  public storeDetails(data: any) {
    this.RxSubject.next(data);
    this.RxSubject.complete();
  }

  public getDetails() {
    return this.RxSubject.getValue();
  }

  logout() {
    this.cookieService.deleteAll();
  }
}
