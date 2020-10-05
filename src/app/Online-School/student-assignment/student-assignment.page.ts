import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.page.html',
  styleUrls: ['./student-assignment.page.scss'],
})
export class StudentAssignmentPage implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accesslevelid: any;
  groupid: any;
  studentid: any;
  lessonName: any;
  classId: any;
  lessonId: any;
  instCurrClassSecId: any;
  currSubClassLessId: any;
  currSubId: any;
  subjectName: any;
  userloginid: any;
  teacherId: any;
  instituteid: any;
  currId: any;
  cssClass: any;
  ASSIGNMENTID: any;
  mode;
  modeldata: any;
  StudentassignmentForm: FormGroup;
  modeldatasub: any;
  checkedData: any = [];
  optArray1: any = [];
  isChecked: boolean;
  isCheckedName: any;
  optArrayduplicate: any = [];
  optArrayduplicate2: any = [];
  dummydata: { ANSWER: any; ASSIGNMENTQNID: any; SELECTEDOPTION: any };
  myArray: any = [];
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  i = 0;
  quizlength: any;
  question: any;
  option: any;
  answerkey: any = [];
  ANSWER: any;
  ASSIGNMENTQNID: any;
  myarray: any = [];
  disablebutton = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.accesslevelid = this.dataStorage.accesslevelid;
    this.groupid = this.dataStorage.groupid;
    this.studentid = this.dataStorage.studentid;
    this.instituteid = this.dataStorage.instId;
    this.teacherId = this.dataStorage.teacherid;
    this.userloginid = this.dataStorage.userloginid;
    this.subjectName = this.dataStorage.getDetails().subjectName;
    this.currSubId = this.dataStorage.getDetails().currSubId;
    this.currSubClassLessId = this.dataStorage.getDetails().currSubClassLessId;
    this.instCurrClassSecId = this.dataStorage.getDetails().instCurrClassSecId;
    this.lessonId = this.dataStorage.getDetails().lessonId;
    this.lessonName = this.dataStorage.getDetails().lessonName;
    this.classId = this.dataStorage.getDetails().classId;
    this.currId = this.dataStorage.getDetails().currId;
    this.cssClass = this.dataStorage.getDetails().cssClass;
    this.ASSIGNMENTID = this.dataStorage.getDetails().ASSIGNMENTID;
    this.StudentassignmentForm = this.formBuilder.group({
      optiondata: this.formBuilder.control(''),
      // TITLE: this.formBuilder.control(''),
      TOTALMARKS: this.formBuilder.control(''),
      selectedData: this.formBuilder.control(''),
      radioButton: this.formBuilder.control(''),
    });
    this.route.paramMap.subscribe((params) => {
      this.mode = params.get('mode');
    });
    this.loadmodelquestions();
  }

  loadmodelquestions() {
    if (this.mode === 'add' || this.mode === 'view') {
      const obj = {
        ASSIGNMENTID: this.ASSIGNMENTID,
      };
      this.http
        .postData('assignment/getassignmentbyidforstudent', obj)
        .subscribe((response: any) => {
          this.modeldatasub = response.body.submission;
          this.modeldata = response.body.subqtnary;
          this.question = this.modeldata[0].ASSIGNMENTQN;
          this.ANSWER = this.modeldata[0].ANSWER;
          this.option = this.modeldata[0].Answerlist;

          this.myarray = this.modeldata;
          console.log(this.myarray + '.........');
          // console.log(this.modeldata[0]);
          this.ASSIGNMENTQNID = this.modeldata[0].ASSIGNMENTQNID;

          this.i = 0;
          this.quizlength = this.modeldata.length;
          this.StudentassignmentForm.patchValue({
            TOTALMARKS: this.modeldatasub.TOTALMARKS,
            // TOTALMARKS
          });
          // alert(this.modeldata.ANSWER);
          for (let i = 0; i < this.modeldata.length; i++) {
            // Answerlist.push(opobj1)

            /*    let opobj1 = {
              ANSWER :  this.modeldata[i].ANSWER
            }
            this.option.push(opobj1);
            this.modeldata[i].optionsList = this.option   */
            /*  let opobj2 = {
              op: this.modeldata[i].OP2,
            }

            let opobj3 = {
              op: this.modeldata[i].OP3,
            }

            let opobj4 = {
              op: this.modeldata[i].OP4,
            }
            optArray.push(opobj1);
            optArray.push(opobj2);
            optArray.push(opobj3);
            optArray.push(opobj4); */
            /*   this.modeldata[i].chkval = optArray;
            this.modeldata[i].optionsList = optArray */ // console.log(optArray)
            // console.log(this.modeldata);
            /*  this.modeldata[i].Answerlist = Answerlist */
            console.log(this.modeldata);
          }
        });
    }
  }

  selectMember(data, isChecked: boolean, op, k) {
    // alert(data);
    // console.log(data)
    console.log(this.modeldata[k]);
    // this.checkedData.push(this.modeldata[j]);
    console.log(this.checkedData);
    let opobj1;
    for (let i = 0; i < this.checkedData.length; i++) {
      // this.dummydata = this.checkedData[i].ASSIGNMENTQNID
      opobj1 = {
        ANSWER: this.checkedData[i].ANSWER,
        ASSIGNMENTQNID: this.checkedData[i].ASSIGNMENTQNID,
        SELECTEDOPTION: op,
      };
      // this.checkedData.pop(this.modeldata[j]);
      this.optArray1.push(opobj1);
      // console.log('........'+this.checkedData)
    }

    /*  } else {
      let index = this.checkedData.indexOf(data);
      this.checkedData.splice(index, 1);
    }  */
    /*   } */
    // data.chkval = op;
    // console.log('data   ',data);
    // console.log('1 === ',this.modeldata[j])
    // this.modeldata[j].push(data);
    // this.modeldata.splice(j,0,data);
    // console.log('=== ',this.modeldata);
    /*  for(let i = 0; i < this.modeldata.length; i++) {

      console.log(this.modeldata[i]);
     if(this.modeldata[i] === j) {

     } else {

     }
    } */
    // console.log('this.modeldata ',this.modeldata);
    /*  alert(j);
  console.log(data);
  this.checkedData.push(data);
  let opobj1;
  for (let i = 0; i < this.checkedData.length; i++) {

    opobj1 = {
      ANSWER: this.checkedData[i].ANSWER,
      ASSIGNMENTQNID: this.checkedData[i].ASSIGNMENTQNID,
      SELECTEDOPTION: op
    }
    this.checkedData.pop(data);
    this.optArray1.push(opobj1);
    console.log(this.optArray1)
  } */
  }

  /*   if (isChecked) {
      alert('1');
      this.checkedData.push(data);
      let opobj1;
      for (let i = 0; i < this.checkedData.length; i++) {
        this.dummydata = this.checkedData[i].ASSIGNMENTQNID
        opobj1 = {
          ANSWER: this.checkedData[i].ANSWER,
          ASSIGNMENTQNID: this.checkedData[i].ASSIGNMENTQNID,
          SELECTEDOPTION: op
        }
        this.checkedData.pop(data);
        this.optArray1.push(opobj1);
         for(let k = 0; k < this.optArray1.length; k++) {
         alert(this.optArray1[k].ASSIGNMENTQNID)
           if(this.dummydata === this.optArray1[k].ASSIGNMENTQNID) {
             this.myArray = this.myArray.filter(function( obj ) {
              return obj.field !== 'ASSIGNMENTQNID';
          });
          } else {
            alert(false)
          }
        }

      }

    } else {
      let index = this.checkedData.indexOf(data);
      this.checkedData.splice(index, 1);
    } */
  /*   } */

  data($event, j) {
    if (j === 0 || j === 1 || j === 2 || j == 3) {
      this.disablebutton = false;
    }
  }
  next(value) {
    // alert(nextbutton);
    // nextbutton.disabled = true;
    this.StudentassignmentForm.controls['radioButton'].reset();
    if (this.modeldata.length - 1 > this.i) {
      this.question = this.modeldata[this.i + 1].ASSIGNMENTQN;
      this.option = this.modeldata[this.i + 1].Answerlist;
    }
    this.ASSIGNMENTQNID = this.modeldata[this.i].ASSIGNMENTQNID;
    this.ANSWER = this.modeldata[this.i].ANSWER;
    this.disablebutton = true;
    const obj = {
      ASSIGNMENTQNID: this.ASSIGNMENTQNID,
      ANSWER: this.ANSWER,
      SELECTEDOPTION: value,
    };

    this.answerkey.push(obj);
    this.i++;
    // console.log(this.answerkey);
  }
  onAddsubmit(value) {
    // console.log(value);
    this.next(value);
    // console.log(this.next(value) + '........')
    console.log(this.answerkey);
    const obj = {
      submission: {
        ASSIGNMENTID: this.ASSIGNMENTID,
        TOTALMARKS: this.StudentassignmentForm.get('TOTALMARKS').value,
        STUDENTID: this.studentid,
        CURSUBID: this.currSubId,
        INSTCURCLASSSECID: this.instCurrClassSecId,
        CURSUBCLASSLESID: this.currSubClassLessId
      },
      subqtnary: this.answerkey,
    };
    console.log(obj);

    this.http
      .postData('assignment/saveassignmentsubmission', obj)
      .subscribe(async (response) => {
        const respObj: any = response.body;
        const status = respObj.status;
        if (status === true) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Success',
            message: 'Assignment Saved Successfully.',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/online-school/student-assignmentlist']);
        } else {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Failed',
            message: 'Assignment Saved Failed.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    this.optArray1 = [];
    // this.selectedData = [];
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure, you want to logout ?',
      buttons: [
        {
          text: 'NO',
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
}
