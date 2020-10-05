import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.page.html',
  styleUrls: ['./student-result.page.scss'],
})
export class StudentResultPage implements OnInit {
  currSubClassLessId: any;
  instCurrClassSecId: any;
  lessonId: any;
  lessonName: any;
  ASSIGNMENTID: any;
  studentid: string;
  resultdata: any = [];

 
  constructor(private modalController: ModalController,
              private dataStorage: DataStorageService,
              private http: HttpService,
    ) { }

  ngOnInit() {
   // this.ASSIGNMENTID = this.dataStorage.getDetails().ASSIGNMENTID;
   this.studentid = this.dataStorage.studentid;
    this.currSubClassLessId = this.dataStorage.getDetails().currSubClassLessId;
    this.instCurrClassSecId = this.dataStorage.getDetails().instCurrClassSecId;
    this.lessonId = this.dataStorage.getDetails().lessonId;
    this.lessonName = this.dataStorage.getDetails().lessonName;
    
    //alert(this.currSubClassLessId);
    //alert(this.ASSIGNMENTID);
  /*   alert(this.lessonName);  */
  this.loaddata();
  }

  loaddata() {
      const obj = {
        assignmentid: this.ASSIGNMENTID,
        studentid:  this.studentid
      };
      this.http.postData('assignment/getresults', obj)
        .subscribe(response => {
          //console.log(response);
          this.resultdata = response.body
          console.log(this.resultdata);
        });
    
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
