import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.page.html',
  styleUrls: ['./videos-list.page.scss'],
})
export class VideosListPage implements OnInit {
  videosListForm: FormGroup;
  savedVideos = [];
  videoListDetails: any;
  @Input() teacherId: string;
  @Input() currSubClassLessId: string;
  @Input() instCurrClassSecId: string;
  @Input() curriculumName: string;
  @Input() className: string;
  @Input() subjectName: string;
  @Input() lessonId: string;
  @Input() lessonName: string;
  @Input() cssImage: string;
  @Input() cssClass: string;
  showNoVideo: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataService: DataStorageService,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // this.getDefaultDetails();
  }

  ionViewDidEnter() {
    this.getAllVideoDetails();
  }

  getDefaultDetails() {
    this.videoListDetails = this.dataService.getDetails();
    this.videosListForm = this.formBuilder.group({
      teacherId: this.formBuilder.control(''),
      currSubClassLessId: this.formBuilder.control(''),
      instCurrClassSecId: this.formBuilder.control(''),
    });
    this.videosListForm.patchValue(this.videoListDetails);
    this.curriculumName = this.videoListDetails.curriculumName,
    this.className = this.videoListDetails.className,
    this.subjectName = this.videoListDetails.subjectName,
    this.lessonId = this.videoListDetails.lessonId;
    this.lessonName = this.videoListDetails.lessonName;
    this.cssImage = this.videoListDetails.cssImage;
    this.cssClass = this.videoListDetails.cssClass;
  }

  getAllVideoDetails() {
    const obj = {
      /* teacherId: this.videosListForm.get('teacherId').value,
      currSubClassLessId: this.videosListForm.get('currSubClassLessId').value,
      instCurrClassSecId: this.videosListForm.get('instCurrClassSecId').value */
      teacherId: this.teacherId,
      currSubClassLessId: this.currSubClassLessId,
      instCurrClassSecId: this.instCurrClassSecId
    };
    this.http.postData('video/getAllVideoDtails', obj)
    .subscribe((result: any) => {
      if (result.body.length > 0) {
        this.savedVideos = result.body;
        this.showNoVideo = false;
      } else {
        this.showNoVideo = true;
        this.savedVideos = [];
      }
    });
  }

  editVideo(video: any) {
    const obj = {
      id: video.id,
      instId: video.INSTID,
      teacherId: video.TEACHERID,
      currId: video.CURRID,
      classId: video.CLASSID,
      instCurrClassId: video.INSTCURCLASSID,
      instCurrClassSecId: video.INSTCURCLASSSECID,
      currSubId: video.CURSUBID,
      currSubClassLessId: video.CURSUBCLASSSLESID,
      teacherRemarks: video.TEACHERREMARKS,
      videoId: video.VIDEOID,
      videoSeqNo: video.VIDEOSEQNO,
      videoStatus: video.VIDEOSTATUS,
      videoAudioPath: video.VIDEOAUDIOPATH,
      videoAudioName: video.VIDEOAUDIONAME,
      modifyFlag: true,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage: this.cssImage,
    };
    this.modalController.dismiss(obj);
    // this.dataService.storeDetails(obj);
    // this.router.navigate(['/online-school/add-video']);
  }

  async deleteVideo(video: any) {
    const obj = {
      id: video.id,
      videoAudioName: video.VIDEOAUDIONAME,
      instCurrClassSecId: video.INSTCURCLASSSECID,
      curriculumName: this.curriculumName,
      className: this.className,
      subjectName: this.subjectName,
      lessonName: this.lessonName
    };
    const confirmAlert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure, you want to delete this video?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          handler: () => {
            this.http.postData('video/deleteVideoDetails', obj)
            .subscribe(async (result: any) => {
              if (result) {
                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Success',
                  message: 'Video is deleted successfully.',
                  buttons: [
                    {
                      text: 'Ok',
                      cssClass: 'secondary',
                      handler: () => {
                        this.getAllVideoDetails();
                      }
                    }
                  ]
                });
                await alert.present();
              }
            });
          }
        }
      ]
    });
    await confirmAlert.present();
  }

  closeModal() {
    const obj = {
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage: this.cssImage,
    };
    this.modalController.dismiss(obj);
  }

}
