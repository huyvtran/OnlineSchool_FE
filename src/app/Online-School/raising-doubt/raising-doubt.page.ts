import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raising-doubt',
  templateUrl: './raising-doubt.page.html',
  styleUrls: ['./raising-doubt.page.scss'],
})
export class RaisingDoubtPage implements OnInit {
  hide = false;
  hide1 = false;
  RaisingdoubtsForm: FormGroup;
  studentid: any;
  instituteid: any;
  hide2 = false;
  statusList = [];
  fromdate: any;
  todate: any;
  doubtdata;
  doubtstatus = false;
  currSubId;
  currSubClassLessId;
  answerdata;
  teacherId: any;
  subjectName: any;
  LESSIONNAME: any;
  allData = [];
  filterData = [];
  accesslevelid: string;
  groupid: string;
  instCurrClassSecId: any;
  lessonId: any;
  lessonName: any;
  classId: any;
  currId: any;
  nodata: boolean = false;
  nodatanswers: boolean = false;
  answerstatus: boolean = false;
  cssClass: any;
  datemessage: boolean = false;

  maxDate: string = new Date().toISOString();
  buttonColor: string = 'danger';
  buttonColor1: string = 'success';
  buttonColor2: string = 'dark';
  cssImage: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.hide = true;
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
    this.studentid = this.dataStorage.studentid;
    this.instituteid = this.dataStorage.instId;
    this.teacherId = this.dataStorage.teacherid;

    this.subjectName = this.dataStorage.getDetails().subjectName;
    this.currSubId = this.dataStorage.getDetails().currSubId;
    this.currSubClassLessId = this.dataStorage.getDetails().currSubClassLessId;
    //this.LESSIONNAME = this.dataStorage.getDetails().LESSIONNAME;
    // alert(this.LESSIONNAME)
    this.instCurrClassSecId = this.dataStorage.getDetails().instCurrClassSecId;
    this.subjectName = this.dataStorage.getDetails().subjectName;
    this.lessonId = this.dataStorage.getDetails().lessonId;
    this.lessonName = this.dataStorage.getDetails().lessonName;
    this.classId = this.dataStorage.getDetails().classId;
    this.currId = this.dataStorage.getDetails().currId;
    this.cssClass = this.dataStorage.getDetails().cssClass;
    this.cssImage = this.dataStorage.getDetails().cssImage;
    //alert(this.lessonName2 + '5');

    this.RaisingdoubtsForm = this.formBuilder.group({
      fromdate: this.formBuilder.control(''),
      todate: this.formBuilder.control(''),
      doubt: this.formBuilder.control(''),
      doubtfor: this.formBuilder.control(1),
    });

    this.statusList = [
      { id: 1, status: 'Self', checked: true },
      { id: 2, status: 'All', checked: false },
    ];
  }

  loaddata(event) {
    const id = event.detail.value;
    if (id === '1') {
      this.hide = true;
      this.hide1 = false;
      this.hide2 = false;
      this.doubtdata = [];
      this.doubtstatus = false;
      this.nodatanswers = false;
      this.answerstatus = false;
      this.nodata = false;
    } else if (id === '3') {
      this.hide1 = true;
      this.hide = false;
      this.hide2 = false;
      this.doubtdata = [];
      this.doubtstatus = false;
      this.nodata = false;
    } else if (id === '2') {
      this.hide2 = true;
      this.hide1 = false;
      this.hide = false;
      this.nodatanswers = false;
      this.answerstatus = false;
    }
  }

  onSubmit() {
    console.log(this.RaisingdoubtsForm.value);
    const obj = {
      studentid: this.studentid,
      instituteid: this.instituteid,
      cursubid: this.currSubId,
      cursubclasslesid: this.currSubClassLessId,
      doubt: this.RaisingdoubtsForm.get('doubt').value,
    };
    this.http.postData('doubt/savedoubt', obj).subscribe(async (response) => {
      const respObj: any = response.body;
      const status = respObj.status;
      if (status === true) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Success',
          message:
            'Your doubt has shared to teacher successfully. You will be informed once it is answered.',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Failed',
          message: 'Error while sharing the doubt, Please try again.',
          buttons: ['OK'],
        });
        await alert.present();
      }
      //this.RaisingdoubtsForm.reset();
      this.RaisingdoubtsForm.controls['doubt'].reset();
    });
  }

  getDetails() {
    console.log(this.RaisingdoubtsForm.value);
    const stringifiedFrom = JSON.stringify(
      this.RaisingdoubtsForm.get('fromdate').value
    );
    this.fromdate = stringifiedFrom.substring(1, 11);
    this.fromdate = this.fromdate.split('-').reverse().join('-');
    const stringified = JSON.stringify(
      this.RaisingdoubtsForm.get('todate').value
    );
    this.todate = stringified.substring(1, 11);
    this.todate = this.todate.split('-').reverse().join('-');
    const obj = {
      frmdate: this.fromdate,
      todate: this.todate,
      doubtfor: this.RaisingdoubtsForm.get('doubtfor').value,
      studenid: this.studentid,
      lesid: this.currSubClassLessId,
      subid: this.currSubId,
      isanswer: 1,
      logintype: 1,
    };
    this.http.postData('doubt/getdoubts', obj).subscribe((response) => {
      this.doubtdata = response.body;
      this.doubtstatus = true;
      if (this.doubtdata.length === 0) {
        this.nodata = true;
        this.doubtstatus = false;
      } else {
        this.nodata = false;
      }
      console.log(this.doubtdata);
      /*  const status = respObj.status; */
    });
  }
  getAnswerData() {
    console.log(this.RaisingdoubtsForm.value);
    const stringifiedFrom = JSON.stringify(
      this.RaisingdoubtsForm.get('fromdate').value
    );
    this.fromdate = stringifiedFrom.substring(1, 11);
    this.fromdate = this.fromdate.split('-').reverse().join('-');
    const stringified = JSON.stringify(
      this.RaisingdoubtsForm.get('todate').value
    );
    this.todate = stringified.substring(1, 11);
    this.todate = this.todate.split('-').reverse().join('-');
    const obj = {
      frmdate: this.fromdate,
      todate: this.todate,
      studenid: this.studentid,
      isanswer: 2,
      doubtfor: this.RaisingdoubtsForm.get('doubtfor').value,
      logintype: 1,
      lesid: this.currSubClassLessId,
      subid: this.currSubId,
    };
    this.http.postData('doubt/getdoubts', obj).subscribe((response) => {
      this.answerdata = response.body;
      if (this.answerdata.length === 0) {
        this.nodatanswers = true;
        this.answerstatus = false;
      } else {
        this.nodatanswers = false;
      }
      console.log(this.answerdata);
    });
  }

  // tslint:disable-next-line: align
  Filterdata(event: any) {
    //this.getAnswerData();
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.doubtdata = this.doubtdata.filter((status) => {
        return status.DOUBT.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  Filterdata1(event: any) {
    //this.getAnswerData();
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.answerdata = this.answerdata.filter((status) => {
        return status.DOUBT.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }

  loadlisteningpage() {
    const obj = {
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      currId: this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      cssClass: this.cssClass,
    };
    this.dataStorage.storeDetails(obj);
    console.log(this.dataStorage.storeDetails(obj));
    this.router.navigate(['/online-school/listening-lesson']);
  }
  loadreadinglessonpage() {
    const obj = {
      currId: this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
    };
    console.log(obj);
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/reading-lesson']);
  }

  loadDate() {
    const stringifiedFrom = JSON.stringify(
      this.RaisingdoubtsForm.get('fromdate').value
    );
    this.fromdate = stringifiedFrom.substring(1, 11);
    this.fromdate = this.fromdate.split('/').reverse().join('/');
    const stringified = JSON.stringify(
      this.RaisingdoubtsForm.get('todate').value
    );
    this.todate = stringified.substring(1, 11);
    this.todate = this.todate.split('/').reverse().join('/');
    console.log(this.fromdate);
    console.log(this.todate);
    if (Date.parse(this.fromdate) > Date.parse(this.todate)) {
      this.datemessage = true;
    } else {
      this.datemessage = false;
    }
  }

  loadstudentassignment() {
    const obj = {
      currId: this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      currSubClassLessId:  this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage: this.cssImage
    };
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/student-assignmentlist']);
  }
}
