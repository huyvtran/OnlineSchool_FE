import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-doubt',
  templateUrl: './teacher-doubt.page.html',
  styleUrls: ['./teacher-doubt.page.scss'],
})
export class TeacherDoubtPage implements OnInit {
  TeacherdoubtsForm: FormGroup;
  hide = false;
  hide1 = false;
  doubtdata: any;
  statusList = [];
  fromdate: any;
  todate: any;
  studentid: string;
  instituteid: string;
  doubt: any;
  doubtid: any;
  users: object;
  dataSource: any;
  searchTerm: any = '';
  answerdata;
  teacherId: string;
  subjectName: string;
  lessonName: string;
  accesslevelid: string;
  groupid: string;
  lessonId: any;
  nodata: boolean = false;
  doubtstatus: boolean = false;
  loadlist: boolean = false;
  hidedoubt: boolean;
  currSubClassLessId: any;
  instCurrClassSecId: any;
  currSubId: any;
  videoDetails: any;
  videoStatus: number;
  datemessage: boolean = false;
  //maxDate = new Date();
  maxDate: string = new Date().toISOString();
  buttonColor: string = 'primary';
  buttonColor1: string = 'primary';
  cssImage: any;
  cssClass: any;
  classId: any;
  currId: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private menuController: MenuController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.hide = true;
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
    this.studentid = this.dataStorage.studentid;
    this.teacherId = this.dataStorage.teacherid;
    this.instituteid = this.dataStorage.instId;
    this.videoDetails = this.dataStorage.getDetails();
    this.subjectName = this.dataStorage.getDetails().subjectName;
    this.lessonName = this.dataStorage.getDetails().lessonName;
    this.lessonId = this.dataStorage.getDetails().lessonId;
    this.currSubClassLessId = this.dataStorage.getDetails().currSubClassLessId;
    this.instCurrClassSecId = this.dataStorage.getDetails().instCurrClassSecId;
    this.currSubId = this.dataStorage.getDetails().currSubId;
    this.classId = this.dataStorage.getDetails().classId;
    this.currId = this.dataStorage.getDetails().currId;
    this.cssClass = this.dataStorage.getDetails().cssClass;
    this.cssImage = this.dataStorage.getDetails().cssImage;

    this.TeacherdoubtsForm = this.formBuilder.group({
      fromdate: this.formBuilder.control(''),
      todate: this.formBuilder.control(''),
      doubtfor: this.formBuilder.control(1),
    });

    this.statusList = [
      { id: 1, status: 'Self', checked: true },
      { id: 2, status: 'All', checked: false },
    ];
  }

  ionViewDidEnter() {
    this.onSubmit();
  }

  onSubmit() {
    console.log(this.TeacherdoubtsForm.value);
    const stringifiedFrom = JSON.stringify(
      this.TeacherdoubtsForm.get('fromdate').value
    );
    this.fromdate = stringifiedFrom.substring(1, 11);
    this.fromdate = this.fromdate.split('-').reverse().join('-');
    const stringified = JSON.stringify(
      this.TeacherdoubtsForm.get('todate').value
    );
    this.todate = stringified.substring(1, 11);
    this.todate = this.todate.split('-').reverse().join('-');
    const obj = {
      frmdate: this.fromdate,
      todate: this.todate,
      studenid: this.teacherId,
      lesid: this.currSubClassLessId,
      subid: this.currSubId,
      instid: this.instituteid,
      isanswer: 1,
      logintype: 2,
      doubtfor: this.TeacherdoubtsForm.get('doubtfor').value,
      secid:  this.instCurrClassSecId
    };
    this.http.postData('doubt/getdoubts', obj).subscribe((response) => {
      this.doubtdata = response.body;
      console.log(this.doubtdata);
      this.hidedoubt = true;
      if (this.doubtdata.length === 0) {
        this.doubtstatus = true;
        this.nodata = false;
        this.hidedoubt = false;
      } else {
        this.doubtstatus = false;
      }
    });
  }

  loadDate() {
    const stringifiedFrom = JSON.stringify(
      this.TeacherdoubtsForm.get('fromdate').value
    );
    this.fromdate = stringifiedFrom.substring(1, 11);
    this.fromdate = this.fromdate.split('/').reverse().join('/');
    const stringified = JSON.stringify(
      this.TeacherdoubtsForm.get('todate').value
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
  getDetails() {
    console.log(this.TeacherdoubtsForm.value);
    const stringifiedFrom = JSON.stringify(
      this.TeacherdoubtsForm.get('fromdate').value
    );
    this.fromdate = stringifiedFrom.substring(1, 11);
    this.fromdate = this.fromdate.split('-').reverse().join('-');
    const stringified = JSON.stringify(
      this.TeacherdoubtsForm.get('todate').value
    );
    this.todate = stringified.substring(1, 11);
    this.todate = this.todate.split('-').reverse().join('-');
    const obj = {
      frmdate: this.fromdate,
      todate: this.todate,
      studenid: this.teacherId,
      lesid: this.currSubClassLessId,
      subid: this.currSubId,
      instid: this.instituteid,
      isanswer: 2,
      doubtfor: this.TeacherdoubtsForm.get('doubtfor').value,
      logintype: 2,
      secid:  this.instCurrClassSecId
    };
    this.http.postData('doubt/getdoubts', obj).subscribe((response) => {
      this.answerdata = response.body;
      if (this.answerdata.length === 0) {
        this.nodata = true;
        this.doubtstatus = false;
      } else {
        this.nodata = false;
      }
      console.log(this.answerdata);
    });
  }
  loaddata(event) {
    const id = event.detail.value;
    if (id === '1') {
      this.hide = true;
      this.hide1 = false;
      this.answerdata = [];
      this.nodata = false;
    } else if (id === '2') {
      this.hide1 = true;
      this.hide = false;
      this.doubtdata = [];
      this.doubtstatus = false;
      this.loadlist = false;
      this.hidedoubt = false;
    }
  }

  loadlabel(status) {
    this.doubt = status.DOUBT;
    this.doubtid = status.id;
  }
  navigateanswerscreen() {
    const obj = {
      DOUBT: this.doubt,
      id: this.doubtid,
      subjectName: this.subjectName,
      lessonName: this.lessonName,
      lessonId: this.lessonId,
      teacherId: this.teacherId,
    };
    console.log(obj);
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['online-school/answer-question']);
  }
  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure, you want to logout ?',
      buttons: [
        {
          text: 'NO',
          /*  cssClass: 'black', */
          handler: () => {
            this.menuController.close();
            console.log('Confirm Okay');
          },
        },
        {
          text: 'YES',
          role: 'YES',
          cssClass: 'secondary',
          handler: (blah) => {
            this.menuController.close();
            this.router.navigate(['/']);
            this.dataStorage.logout();
          },
        },
      ],
    });

    await alert.present();
  }


  Filterdata(event: any) {
    // this.getAnswerData();
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.doubtdata = this.doubtdata.filter((status) => {
        return status.DOUBT.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  loadaddvideo() {
    const obj = this.videoDetails;
    obj.subjectName = this.subjectName;
    obj.lessonId = this.lessonId;
    obj.lessonName = this.lessonName;
    obj.videoStatus = this.videoStatus;
    this.dataStorage.storeDetails(obj);
    this.router.navigate(['/online-school/add-video']);
  }

 
  loadAssignmentlist() {
    const obj = {
      currId:  this.currId,
      classId: this.classId,
      currSubId: this.currSubId,
      currSubClassLessId:  this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage : this.cssImage,
    };
    this.dataStorage.storeDetails(obj);
    console.log(obj);
    this.router.navigate(['/online-school/assignment']);
  }
}
