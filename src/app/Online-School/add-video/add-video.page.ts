import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AlertController, MenuController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { Location } from '@angular/common';
import { VideosListPage } from './videos-list/videos-list.page';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.page.html',
  styleUrls: ['./add-video.page.scss'],
})
export class AddVideoPage implements OnInit {
  videoForm: FormGroup;
  url: SafeResourceUrl = '';
  videoDetails: any;
  FileToUpload: File;
  fileName: string;
  subjectName: string;
  lessonId: string;
  lessonName: string;
  curriculumName: string;
  className: string;
  cssImage: string;
  cssClass: string;
  accesslevelid: any;
  groupid: any;
  videoStatus = 0;
  disableSubmitBtn = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dataService: DataStorageService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getOnloadDetails();
    this.loadVideoDefaultDetails();
    this.getCurriculumNameById();
    this.getClassNameById();
    this.accesslevelid = this.dataService.accesslevelid;
    this.groupid = this.dataService.groupid;
  }

  getOnloadDetails() {
    this.videoForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      instId: this.formBuilder.control(''),
      teacherId: this.formBuilder.control(''),
      currId: this.formBuilder.control(''),
      classId: this.formBuilder.control(''),
      instCurrClassId: this.formBuilder.control(''),
      instCurrClassSecId: this.formBuilder.control(''),
      currSubId: this.formBuilder.control(''),
      currSubClassLessId: this.formBuilder.control(''),
      teacherRemarks: this.formBuilder.control(''),
      videoId: this.formBuilder.control(''),
      videoSeqNo: this.formBuilder.control(''),
      videoAudioPath: this.formBuilder.control(''),
      videoAudioName: this.formBuilder.control(''),
      videoStatus: this.formBuilder.control(null),
      modifyFlag: this.formBuilder.control(false)
    });
  }

  loadVideoDefaultDetails() {
    this.videoDetails = this.dataService.getDetails();
    this.videoForm.patchValue(this.videoDetails);
    this.subjectName = this.videoDetails.subjectName;
    this.lessonId = this.videoDetails.lessonId;
    this.lessonName = this.videoDetails.lessonName;
    this.cssImage = this.videoDetails.cssImage;
    this.cssClass = this.videoDetails.cssClass;
    /* if (this.videoForm.get('modifyFlag').value === true) {
      this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoDetails.videoAudioPath);
    } */
  }

  getTeacherVideoStatus() {
    const obj = {
      teacherId: this.videoForm.get('teacherId').value,
      instCurrClassSecId: this.videoForm.get('instCurrClassSecId').value,
      currSubClassLessId: this.videoForm.get('currSubClassLessId').value,
    };
    this.http.postData('teacher/getTeacherVideoStatus', obj)
    .subscribe((response: any) => {
      if (response.body) {
        this.videoStatus = response.body.VIDEOSTATUS;
      } else {
        this.videoStatus = 0;
      }
    });
  }

  getCurriculumNameById() {
    const obj = {
      currId: this.videoForm.get('currId').value
    };
    this.http.postData('student/getCurriculumNameById', obj)
    .subscribe((result: any) => {
      this.curriculumName = result.body.CURRICULUMNAME;
    });
  }

  getClassNameById() {
    const obj = {
      classId: this.videoForm.get('classId').value
    };
    this.http.postData('student/getClassNameById', obj)
    .subscribe((result: any) => {
      this.className = result.body.CLASSNAME;
    });
  }

  chooseVideo(event) {
    const file = event.target.files && event.target.files[0] as File;
    if (file) {
      if (file.type === 'video/x-ms-wmv' || file.type === 'video/mp4') {
        console.log(file.size, ' ', typeof file.size);
        if (file.size <= 60000000) {
          this.FileToUpload = file;
          this.fileName = file.name;
          this.videoForm.patchValue({videoAudioName: file.name});
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            this.url = (event.target as FileReader).result;
            // console.log(this.url);
          };
        } else {
          alert('please choose the video below 75 mb');
        }
      } else {
        alert('Invalid video type, please check and try again');
      }
    }
  }

  async getVideosList() {
    const obj = {
      teacherId: this.videoForm.get('teacherId').value,
      currSubClassLessId: this.videoForm.get('currSubClassLessId').value,
      instCurrClassSecId: this.videoForm.get('instCurrClassSecId').value,
      curriculumName: this.curriculumName,
      className: this.className,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssImage: this.cssImage,
      cssClass: this.cssClass,
    };
    const modal = await this.modalController.create({
      component: VideosListPage,
      componentProps: obj
    });

    modal.onDidDismiss()
    .then((data) => {
      console.log(data);
      this.videoDetails = data.data;
      this.videoForm.patchValue(this.videoDetails);
      this.subjectName = this.videoDetails.subjectName;
      this.lessonId = this.videoDetails.lessonId;
      this.lessonName = this.videoDetails.lessonName;
      this.cssImage = this.videoDetails.cssImage;
      this.cssClass = this.videoDetails.cssClass;
      if (this.videoForm.get('modifyFlag').value === true) {
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoDetails.videoAudioPath);
      }
    });

    return await modal.present();
    // this.dataService.storeDetails(obj);
    // this.router.navigate(['online-school/videos-list']);
  }

  async saveAsDraft() {
    this.videoForm.patchValue({
      videoStatus: 1
    });
    if (this.videoForm.get('modifyFlag').value === false) {
      if (this.fileName !== undefined && this.fileName.length > 0) {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          spinner: 'circles',
          message: 'Please wait, Your video is saving as a draft.',
          translucent: true,
          backdropDismiss: false,
        });
        await loading.present();
        this.disableSubmitBtn = true;

        this.addVideo()
        .subscribe(async (result: any) => {
          await loading.dismiss();
          this.disableSubmitBtn = false;
          if (result.body) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Success',
              message: 'Video is saved as draft successfully.',
              buttons: ['OK']
            });
            await alert.present();
            this.fileName = '';
            this.url = '';
            this.videoForm.patchValue({teacherRemarks: ''});
          }
        }, async (error) => {
          if (error) {
            await loading.dismiss();
            this.fileName = '';
            this.url = '';
            this.videoForm.patchValue({teacherRemarks: ''});
          }
        });
      } else {
        this.disableSubmitBtn = false;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Warning',
          message: 'Please add video to upload.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        spinner: 'circles',
        message: 'Please wait, Your video is updating as a draft.',
        translucent: true,
        backdropDismiss: false,
      });
      await loading.present();
      this.disableSubmitBtn = true;

      this.updateVideo()
      .subscribe(async (result: any) => {
        await loading.dismiss();
        this.disableSubmitBtn = false;
        if (result.body) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Success',
            message: 'Video is updated as draft successfully.',
            buttons: ['OK']
          });
          await alert.present();
          this.fileName = '';
          this.url = '';
          this.videoForm.patchValue({teacherRemarks: ''});
          this.location.back();
          this.disableSubmitBtn = true;
        }
      });
    }
  }

  async uploadVideo() {
    this.videoForm.patchValue({
      videoStatus: 2
    });

    if (this.videoForm.get('modifyFlag').value === false) {
      if (this.fileName !== undefined && this.fileName.length > 0) {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          spinner: 'circles',
          message: 'Please wait, Your video is sharing to students.',
          translucent: true,
          backdropDismiss: false,
        });
        await loading.present();
        this.disableSubmitBtn = true;

        this.addVideo()
        .subscribe(async (result: any) => {
          await loading.dismiss();
          this.disableSubmitBtn = false;
          if (result.body) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Success',
              message: 'Video is saved and shared to students successfully.',
              buttons: ['OK']
            });
            await alert.present();
            this.fileName = '';
            this.url = '';
            this.videoForm.patchValue({teacherRemarks: ''});
          }
        }, async (error) => {
          if (error) {
            await loading.dismiss();
            this.fileName = '';
            this.url = '';
            this.videoForm.patchValue({teacherRemarks: ''});
          }
        });
      } else {
        this.disableSubmitBtn = false;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Warning',
          message: 'Please add video to upload.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        spinner: 'circles',
        message: 'Please wait, Your video is updating to students.',
        translucent: true,
        backdropDismiss: false,
      });
      await loading.present();
      this.disableSubmitBtn = true;

      this.updateVideo()
      .subscribe(async (result: any) => {
        if (result) {
          await loading.dismiss();
          this.disableSubmitBtn = false;
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Success',
            message: 'Video is updated and shared to students successfully.',
            buttons: ['OK']
          });
          await alert.present();
          this.fileName = '';
          this.url = '';
          this.videoForm.patchValue({teacherRemarks: ''});
          this.location.back();
          this.disableSubmitBtn = true;
        }
      });
    }
  }

  addVideo() {
    const fileToUpload: File = this.FileToUpload;
    // const fileName = fileToUpload.name;
    const videoDetails = this.videoForm.value;
    if (this.fileName !== undefined && this.fileName.length > 0) {
      const formData: FormData = new FormData();
      formData.append('video', fileToUpload);
      formData.append('id', videoDetails.id);
      formData.append('instId', videoDetails.instId);
      formData.append('teacherId', videoDetails.teacherId);
      formData.append('currId', videoDetails.currId);
      formData.append('classId', videoDetails.classId);
      formData.append('instCurrClassId', videoDetails.instCurrClassId);
      formData.append('instCurrClassSecId', videoDetails.instCurrClassSecId);
      formData.append('currSubId', videoDetails.currSubId);
      formData.append('currSubClassLessId', videoDetails.currSubClassLessId);
      formData.append('teacherRemarks', videoDetails.teacherRemarks);
      formData.append('videoId', videoDetails.videoId);
      formData.append('videoSeqNo', videoDetails.videoSeqNo);
      formData.append('videoAudioPath', videoDetails.videoAudioPath);
      formData.append('videoAudioName', videoDetails.videoAudioName);
      formData.append('videoStatus', videoDetails.videoStatus);
      formData.append('modifyFlag', videoDetails.modifyFlag);

      formData.append('curriculumName', this.curriculumName);
      formData.append('className', this.className);
      formData.append('subjectName', this.subjectName);
      formData.append('lessonId', this.lessonId);
      formData.append('lessonName', this.lessonName);

      return this.http.postData('video/saveVideo', formData);
    }
  }

  updateVideo() {
    const obj = {
      id: this.videoForm.get('id').value,
      videoStatus: this.videoForm.get('videoStatus').value,
      teacherRemarks: this.videoForm.get('teacherRemarks').value,
      currSubClassLessId: this.videoForm.get('currSubClassLessId').value,
      instCurrClassSecId: this.videoForm.get('instCurrClassSecId').value,
    };
    return this.http.postData('video/updateVideoDetails', obj);
  }

  /* async openPopOver() {
    const popover = await this.popoverController.create({
    })
  } */

  navigatetohome() {
    if (this.accesslevelid === '1' && this.groupid === '2') {
      this.router.navigate(['/online-school/select-curriculum']);
    } else if (this.accesslevelid === '1' && this.groupid === '3') {
      this.router.navigate(['/online-school/activity']);
    }
  }

  loadteacherpage() {
    const obj = {
      subjectName: this.subjectName,
      lessonName: this.lessonName,
      lessonId: this.lessonId,
      currSubClassLessId: this.videoForm.get('currSubClassLessId').value,
      currSubId: this.videoForm.get('currSubId').value,
      cssClass: this.cssClass,
      cssImage: this.cssImage,
      currId: this.videoForm.get('currId').value,
      classId: this.videoForm.get('classId').value,
    };
    this.dataService.storeDetails(obj);
    console.log(obj)
    this.router.navigate(['/online-school/teacher-doubt']);
  }

  loadReportPage() {
    const obj = {
      subjectName: this.subjectName,
      lessonName: this.lessonName,
      lessonId: this.lessonId,
      currSubClassLessId: this.videoForm.get('currSubClassLessId').value,
      currSubId: this.videoForm.get('currSubId').value,
      cssClass: this.cssClass,
      cssImage: this.cssImage
    };
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/report']);
  }
  loadAssignmentlist() {
    const obj = {
      currId: this.videoForm.get('currId').value,
      classId: this.videoForm.get('classId').value,
      currSubId: this.videoForm.get('currSubId').value,
      currSubClassLessId: this.videoForm.get('currSubClassLessId').value,
      instCurrClassSecId: this.videoForm.get('instCurrClassSecId').value,
      subjectName: this.subjectName,
      lessonId: this.lessonId,
      lessonName: this.lessonName,
      cssClass: this.cssClass,
      cssImage : this.cssImage,
    };
    this.dataService.storeDetails(obj);
    this.router.navigate(['/online-school/assignment']);
  }
}
