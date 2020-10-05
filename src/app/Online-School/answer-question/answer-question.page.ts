import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.page.html',
  styleUrls: ['./answer-question.page.scss'],
})
export class AnswerQuestionPage implements OnInit {
  AnswerqtnForm: FormGroup;
  doubtid: any;
  doubt: any;
  subjectName: any;
  lessonName: any;
  lessonId: any;
  teacherId: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private router: Router,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.doubt = this.dataStorage.getDetails().DOUBT;
    this.doubtid = this.dataStorage.getDetails().id;
    this.subjectName = this.dataStorage.getDetails().subjectName;
    this.lessonName = this.dataStorage.getDetails().lessonName;
    this.lessonId = this.dataStorage.getDetails().lessonId;
    this.teacherId = this.dataStorage.getDetails().teacherId;
    this.AnswerqtnForm = this.formBuilder.group({
      answer: this.formBuilder.control(''),
    });
  }

  onSubmit() {
    console.log(this.AnswerqtnForm.value);
    const obj = {
      id: this.doubtid,
      answer: this.AnswerqtnForm.get('answer').value,
      teacherid : this.teacherId
    };
    this.http.postData('doubt/saveanswer', obj).subscribe(async (response) => {
      console.log(response);
      const Answerdata: any = response.body;
      if (Answerdata.status === true) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Success',
          message: 'Your response is shared to students, thank you!.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['online-school/teacher-doubt']);
        this.AnswerqtnForm.reset();
      }
    });
  }
}
