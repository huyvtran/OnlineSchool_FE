import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http/http.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-open-pdf',
  templateUrl: './open-pdf.page.html',
  styleUrls: ['./open-pdf.page.scss'],
})
export class OpenPdfPage implements OnInit {
  pdfSrc;
  page = 1;
  @Input() curriculumName: string;
  @Input() className: string;
  @Input() subjectName: string;
  @Input() lessonId: string;
  @Input() lessonName: string;

  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getLessonPdf();
  }

  async getLessonPdf() {
    const obj = {
      curriculumName: this.curriculumName,
        className: this.className,
        subjectName: this.subjectName,
        lessonId: this.lessonId,
        lessonName: this.lessonName
    };
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'circles',
      message: 'Please wait, opening the selected lesson is in progress...',
      translucent: true,
      backdropDismiss: false,
    });
    await loading.present();
    this.http.postData('student/readLessonPdf', obj)
    .subscribe(async (result: any) => {
      await loading.dismiss();
      if (result.body) {
        this.pdfSrc = 'data:application/pdf;base64,' + result.body.base64String;
      }
    }, async (error) => {
      if (error) {
        await loading.dismiss();
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
