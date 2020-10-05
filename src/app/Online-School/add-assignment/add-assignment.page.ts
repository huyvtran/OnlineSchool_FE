import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.page.html',
  styleUrls: ['./add-assignment.page.scss'],
})
export class AddAssignmentPage implements OnInit {
  assignmentForm: FormGroup;
  modeldata = [];
  mode;
  AddquestionForm: FormGroup;
  hidemodelq: boolean = true;
  hidaddques: boolean = false;
  selectedData: any = [];
  qtnary: any = [];
  checkedData: any  = [];
  accesslevelid: string;
  groupid: string;
  studentid: string;
  instituteid: string;
  teacherId: string;
  cssClass: any;
  currId: any;
  classId: any;
  lessonName: any;
  lessonId: any;
  subjectName: any;
  instCurrClassSecId: any;
  currSubClassLessId: any;
  currSubId: any;
  userloginid: any;
  AddquestiontitleForm: FormGroup;
  ASSIGNMENTID: any;
  modelviewdata: any ;
  viewdisable: boolean = false;
  ASSIGNMENTMODE: any;
  status: boolean = false;
  disablebutton: boolean  = true;
  model;
  model1: string;
  disablebutton2: boolean = true;
  modeldisabled: boolean = false;
  hidepostquestions: boolean = false;
  prepareself: boolean = true;
  hidaddques1: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private http: HttpService,
    private dataStorage: DataStorageService,
    private menuController: MenuController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.model1 = "model";
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
     this.AddquestionForm = this.formBuilder.group({
      ASSIGNMENTQN: this.formBuilder.control(''),
      OP1: this.formBuilder.control(''),
      OP2: this.formBuilder.control(''),
      OP3: this.formBuilder.control(''),
      OP4: this.formBuilder.control(''),
      CHK1: this.formBuilder.control(false),
      CHK2: this.formBuilder.control(false),
      CHK3: this.formBuilder.control(false),
      CHK4: this.formBuilder.control(false),
    });  
   
    this.assignmentForm = this.formBuilder.group({
      optiondata: this.formBuilder.control(''),
      TITLE: this.formBuilder.control(''),
      TOTALMARKS: this.formBuilder.control(''),
    }); 
    this.AddquestiontitleForm = this.formBuilder.group({
      TITLE1: this.formBuilder.control(''),
      TOTALMARKS1: this.formBuilder.control(''),
    }); 
  
    this.route.paramMap.subscribe(params => {
      this.mode = params.get('mode');
    });
    this.loadview();
    this.loadmodelquestions()
  }
  loadview() {
    if (this.mode === 'view' || this.mode === 'edit') { 
      
      const obj = {
        assignmentid:  this.ASSIGNMENTID,
        //status: 2
      }
      this.http.postData('assignment/getassignmentbyid', obj)
      .subscribe((response: any) => {
        this.modelviewdata = response.body.assignment;
        this.ASSIGNMENTMODE = this.modelviewdata.ASSIGNMENTMODE
        this.modeldata = response.body.qtnary;
      /*   for (let i = 0; i <  this.modeldata.length; i++) {
          const optArray = [];
          optArray.push(this.modeldata[i].OP1);
          optArray.push(this.modeldata[i].OP2);
          optArray.push(this.modeldata[i].OP3);
          optArray.push(this.modeldata[i].OP4);
          console.log('opt array ====> ', optArray);
          this.modeldata[i].optionsList = optArray;
        } */ 
        //console.log(this.modelviewdata.TITLE);
        for (let i = 0; i <  this.modeldata.length; i++) {
          const optArray = [];
          let opobj1 = {
            op : this.modeldata[i].OP1,
            ch : this.modeldata[i].CHK1
          }
  
          let opobj2 = {
            op : this.modeldata[i].OP2,
            ch : this.modeldata[i].CHK2
          }
  
          let opobj3 = {
            op : this.modeldata[i].OP3,
            ch : this.modeldata[i].CHK3
          }
  
          let opobj4 = {
            op : this.modeldata[i].OP4,
            ch : this.modeldata[i].CHK4
          }
          optArray.push(opobj1);
          optArray.push(opobj2);
          optArray.push(opobj3);
          optArray.push(opobj4);
  
        this.modeldata[i].optionsList = optArray;
        console.log(this.modeldata);
        } 
        this.assignmentForm.patchValue({
          TITLE : this.modelviewdata.TITLE,
          TOTALMARKS : this.modelviewdata.TOTALMARKS
         })
      })
    }
    if(this.mode === 'view') {
      this.assignmentForm.disable()
      this.viewdisable = true
    }
  }
  loaddata(id) {
    if(id === '1') {
    this.hidemodelq = false;
    //this.hidaddques = true;
  } else if(id === '2'){
    this.hidemodelq = true;
    this.hidaddques = false;
    this.hidaddques1 = false;
  } else if(id === '3') {
    this.hidemodelq = false;
    this.hidaddques = true;
    this.hidaddques1 = true;
  } 
} 
postloaddata(id) {
 if(id === '4'){
  this.hidepostquestions = false;
  this.hidaddques1 = true;
} else if(id === '5') {
  this.hidepostquestions = true;
  this.prepareself = false
  this.hidaddques1 = false;
}
} 
 async loadalertmsg() {
   if(this.selectedData.length > 0) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Questions where posted. Please do Save as Draft or Save .',
      buttons: [
        {
          text: 'YES',
          role: 'cancel',
        }, {
          text: 'NO',
          handler: () => {
            this.router.navigate(['/online-school/assignment',]);
          }
        }
      ]
    });
    await alert.present();
   }else {
    this.router.navigate(['/online-school/assignment']);
   }
 }

  loadmodelquestions() {
    if (this.mode === 'add') { 
    const obj = {
      classid: this.classId,
      cursubid: this.currSubId
    }
    this.http.postData('assignment/getmodelqtns', obj)
    .subscribe((response: any) => {
      this.modeldata = response.body;
       for (let i = 0; i <  this.modeldata.length; i++) {
        const optArray = [];
        let opobj1 = {
          op : this.modeldata[i].OP1,
          ch : this.modeldata[i].CHK1
        }

        let opobj2 = {
          op : this.modeldata[i].OP2,
          ch : this.modeldata[i].CHK2
        }

        let opobj3 = {
          op : this.modeldata[i].OP3,
          ch : this.modeldata[i].CHK3
        }

        let opobj4 = {
          op : this.modeldata[i].OP4,
          ch : this.modeldata[i].CHK4
        }
        optArray.push(opobj1);
        optArray.push(opobj2);
        optArray.push(opobj3);
        optArray.push(opobj4);

      this.modeldata[i].optionsList = optArray;
      } 
    
      console.log(this.modeldata);
    });
   
  }

 
  }

  selectMember(data, isChecked: boolean){
    //alert(isChecked)
    if(isChecked) {
      this.disablebutton2 = false
      this.checkedData.push(data);
      console.log(this.checkedData);
    } else {
      let index = this.checkedData.indexOf(data);
      this.checkedData.splice(index,1);
      console.log(this.checkedData)
    }
  }
  radiochecked(val){
    if(val)
    {
      this.disablebutton2 = false
    }
    else
    {
      this.disablebutton2 = true;
    }
  }

 /*  radiochecked(data, isChecked: boolean){
    alert(isChecked);
    if(isChecked) {
      this.disablebutton2 = false
      console.log(this.checkedData);
    } else {
      this.disablebutton2 = true;
    }
  } */
    async onPostdata() {
      if(this.AddquestionForm.valid) {
        this.selectedData.push(this.AddquestionForm.value);
        console.log(this.selectedData);
        for (let i = 0; i <  this.selectedData.length; i++) {
          const optArray = [];
          let opobj1 = {
            op : this.selectedData[i].OP1,
            ch : this.selectedData[i].CHK1
          }
  
          let opobj2 = {
            op : this.selectedData[i].OP2,
            ch : this.selectedData[i].CHK2
          }
  
          let opobj3 = {
            op : this.selectedData[i].OP3,
            ch : this.selectedData[i].CHK3
          }
  
          let opobj4 = {
            op : this.selectedData[i].OP4,
            ch : this.selectedData[i].CHK4
          }
          optArray.push(opobj1);
          optArray.push(opobj2);
          optArray.push(opobj3);
          optArray.push(opobj4);
  
        this.selectedData[i].PostDatalist = optArray;
        console.log(this.selectedData);
        } 
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Success',
          message: 'Question Added Successfully.',
          buttons: ['OK']
        });
        this.disablebutton = false
        await alert.present();
        this.AddquestionForm.reset();
      } else {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Failed',
          message: 'Question Added Failed.',
          buttons: ['OK']
        });
        await alert.present();
      }
  
  }
  onModelsaveDraft() {
    this.modeldisabled = true;
    this.selectedData.push(this.AddquestionForm.value);
   console.log(this.selectedData);
   const obj = {
     qtnary: this.checkedData ,
     assignment:
     {
      TITLE : this.assignmentForm.get('TITLE').value,
      INSTID :  this.instituteid,
      CURSUBID:  this.currSubId,
      CURSUBCLASSLESID:  this.currSubClassLessId,
      TEACHERID:  this.teacherId,
      CREATEDBY: this.userloginid,
      ASSIGNMENTSTATUS:1,
      TOTALMARKS: this.assignmentForm.get('TOTALMARKS').value,    
      ASSIGNMENTMODE:1,
      INSTCURCLASSSECID:  this.instCurrClassSecId  
     },
   }
   this.http.postData('assignment/saveassignment', obj)
   .subscribe(async (response) => {
    const respObj: any = response.body;
    const status = respObj.status;
    this.modeldisabled = false;
    if( status ===  true) {
     const alert = await this.alertController.create({
       cssClass: 'my-custom-class',
       header: 'Success',
       message: 'Assignment Saved Successfully.',
       buttons: ['OK']
     });
     await alert.present();
     const obj = {
      classid : this.classId,
      subid : this.currSubId,
      teacherid : this.teacherId,
      lessonid : this.currSubClassLessId,
     }
     this.dataStorage.storeDetails(obj);
     console.log(obj);
     this.router.navigate(['/online-school/assignment']);
     this.assignmentForm.reset();
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Failed',
        message: 'Assignment Saved Failed.',
        buttons: ['OK']
      });
      await alert.present();
    }
   });
   this.qtnary = [];
   this.selectedData = [];
 }

  onModelsubmit() {
    this.selectedData.push(this.AddquestionForm.value);
   console.log(this.selectedData);
   const obj = {
     qtnary: this.checkedData ,
     assignment:
     {
      TITLE : this.assignmentForm.get('TITLE').value,
      INSTID :  this.instituteid,
      CURSUBID:  this.currSubId,
      CURSUBCLASSLESID:  this.currSubClassLessId,
      TEACHERID:  this.teacherId,
      CREATEDBY: this.userloginid,
      ASSIGNMENTSTATUS:2,
      TOTALMARKS: this.assignmentForm.get('TOTALMARKS').value,    
      ASSIGNMENTMODE:1,
      INSTCURCLASSSECID:  this.instCurrClassSecId  
     },
   }
   this.http.postData('assignment/saveassignment', obj)
   .subscribe(async (response) => {
    const respObj: any = response.body;
    const status = respObj.status;
    if( status ===  true) {
     const alert = await this.alertController.create({
       cssClass: 'my-custom-class',
       header: 'Success',
       message: 'Assignment Saved Successfully.',
       buttons: ['OK']
     });
     await alert.present();
     const obj = {
      classid : this.classId,
      subid : this.currSubId,
      teacherid : this.teacherId,
      lessonid : this.currSubClassLessId,
     }
     this.dataStorage.storeDetails(obj);
     console.log(obj);
     this.router.navigate(['/online-school/assignment']);
     this.assignmentForm.reset();
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Failed',
        message: 'Assignment Saved Failed.',
        buttons: ['OK']
      });
      await alert.present();
    }
   });
   this.qtnary = [];
   this.selectedData = [];
 }

 onAddsubmit() {
  this.selectedData.push(this.AddquestionForm.value);
  const newArr = this.selectedData.slice(0, -1);
  console.log(newArr)
 const obj = {
   qtnary:  newArr,
   assignment:
   {
      TITLE : this.AddquestiontitleForm.get('TITLE1').value,
      INSTID :  this.instituteid,
      CURSUBID:  this.currSubId,
      CURSUBCLASSLESID:  this.currSubClassLessId,
      TEACHERID:  this.teacherId,
      CREATEDBY: this.userloginid,
      ASSIGNMENTSTATUS:2,
      TOTALMARKS: this.AddquestiontitleForm.get('TOTALMARKS1').value,    
      ASSIGNMENTMODE:2,
      INSTCURCLASSSECID:  this.instCurrClassSecId  
   },
 }
 this.http.postData('assignment/saveassignment', obj)
 .subscribe(async (response) => {
  const respObj: any = response.body;
  const status = respObj.status;
  if( status ===  true) {
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Success',
     message: 'Assignment Saved Successfully.',
     buttons: ['OK']
   });
   await alert.present();
   this.router.navigate(['/online-school/assignment'])
  } else {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'Assignment Saved Failed.',
      buttons: ['OK']
    });
    await alert.present();
  }
 });
 this.qtnary = [];
 this.selectedData = [];
}

onAddsaveDraft() {
  this.selectedData.push(this.AddquestionForm.value);
  const newArr = this.selectedData.slice(0, -1);
  console.log(newArr)
 const obj = {
   //qtnary: this.checkedData.concat(this.selectedData) ,
   qtnary:  newArr,
   assignment:
   {
      TITLE : this.AddquestiontitleForm.get('TITLE1').value,
      INSTID :  this.instituteid,
      CURSUBID:  this.currSubId,
      CURSUBCLASSLESID:  this.currSubClassLessId,
      TEACHERID:  this.teacherId,
      CREATEDBY: this.userloginid,
      ASSIGNMENTSTATUS:1,
      TOTALMARKS: this.AddquestiontitleForm.get('TOTALMARKS1').value,    
      ASSIGNMENTMODE:2,
      INSTCURCLASSSECID:  this.instCurrClassSecId  
   },
 }
 this.http.postData('assignment/saveassignment', obj)
 .subscribe(async (response) => {
  const respObj: any = response.body;
  const status = respObj.status;
  if( status ===  true) {
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Success',
     message: 'Assignment Saved Successfully.',
     buttons: ['OK']
   });
   await alert.present();
   this.router.navigate(['/online-school/assignment'])
  } else {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'Assignment Saved Failed.',
      buttons: ['OK']
    });
    await alert.present();
  }
 });
 this.qtnary = [];
 this.selectedData = [];
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
          }
        }, {
          text: 'YES',
          role: 'YES',
          cssClass: 'secondary',
          handler: (blah) => {
            this.menuController.close();
            this.router.navigate(['/']);
            this.dataStorage.logout();
          }
        }
      ]
    });
   await alert.present();
  }
 
 }
