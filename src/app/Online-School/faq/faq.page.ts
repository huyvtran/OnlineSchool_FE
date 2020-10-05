import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit {
  faqArray = [];
  constructor() { }

  ngOnInit() {
    this.faqArray = [
      {
        id: 1,
        question: 'What a teacher can do?',
        answer: `Teacher can perform following activities for the students for the classes teacher is taking care.
        a. Videos uploading
        b. Doubts clarification
        c. Preparation of assignments
        d. Reporting`
      },
      {
        id: 2,
        question: 'What is the process to upload a video?',
        // tslint:disable-next-line: max-line-length
        answer: 'First select the class and section for which the video needs to be uploaded. System will bring the subjects what the teacher is taking for the selected class and section. From there teacher needs to select the subject and lesion for which the video needs to be uploaded. In video upload page, video needs to be chosen from mobile using chose video button and save.'
      },
      {
        id: 3,
        question: 'What is difference between saving as draft and upload video?',
        // tslint:disable-next-line: max-line-length
        answer: ' When teacher wanted to save for self and not to publish to students yet, then it needs to be saved as draft. Teacher can visit again either alter or delete the video or it can be shared to students by uploading the video. Upload video means the video is published to students.'
      },
      {
        id: 4,
        question: 'Can teacher alter or delete uploaded video?',
        // tslint:disable-next-line: max-line-length
        answer: 'Yes, as long as none of the students started going through the uploaded video, it can be altered or deleted. But if any one of the students started going through, it cannot be altered or deleted.'
      },
      {
        id: 5,
        question: 'Is there any limit on video size?',
        answer: 'Yes, the maximum size of one video is 60 MB.'
      },
      {
        id: 6,
        question: 'If the lesson size is more than 60 MB, what teacher needs to do?',
        answer: 'Teacher needs to plan the lesson into multiple videos of each having size not more than 60 MB.'
      },
      {
        id: 7,
        question: 'Is there any limit on number of videos for each lesson?',
        answer: 'No, there is no limit.'
      },
      {
        id: 8,
        question: 'What are different status are seeing at lesson level?',
        answer: ` 4 different status can be seen at each lesson level.
        a. Video not uploaded – It is new lesson, no video is uploaded yet
        b. Video uploaded – Teacher video uploaded but none of the students started going through it
        c. In progress – One or more than one student is started going through videos
        d. Completed – All students in that section completed going through uploaded videos.`
      },
      {
        id: 9,
        question: 'How teacher can clarify doubts?',
        // tslint:disable-next-line: max-line-length
        answer: 'When any student belongs to sections what teacher is taking raised doubt, a SMS message will be sent to teacher with the information of class, subject and lesson. Teacher can select the respective class, section, subject and lesson to see the unanswered questions by giving the date range. Teacher can select one by one unanswered questions and clarify the doubt.'
      },
      {
        id: 10,
        question: 'Is there any expiry for unanswered question?',
        // tslint:disable-next-line: max-line-length
        answer: 'No, all answered questions will be available until they answered.'
      },
      {
        id: 11,
        question: 'Will teachers see all doubts?',
        // tslint:disable-next-line: max-line-length
        answer: 'No teachers will see the doubts raised by the students for which teacher is taking'
      },
      {
        id: 12,
        question: 'When a new teacher is assigned to classes, can they see the doubts already raised?',
        // tslint:disable-next-line: max-line-length
        answer: 'Yes. There is an option – Self / All. Self will show the doubts assigned to the logged in teacher. All – loads all doubts raised to other teachers for the selected class, section, subject and lesson'
      },
      {
        id: 13,
        question: 'How student will know when teacher answers doubts?',
        answer: 'When teacher answers the doubt a SMS message will be sent to all students in the class and section.'
      },
      {
        id: 14,
        question: 'What is the process of giving assignment?',
        // tslint:disable-next-line: max-line-length
        answer: 'A teacher can do assignment in two different ways. Pick up the assignment from sample questions available for each lesson or prepare a set of questions with answers.'
      },
      {
        id: 15,
        question: 'How many marks for each question?',
        answer: 'Each questions carries one mark'
      },
      {
        id: 16,
        question: 'Questions are objective or subjective?',
        answer: 'All questions are to be objective only. Each question needs to be with 4 answers. Student will chose one of them.'
      },
      {
        id: 17,
        question: 'Is there any limit on number of questions?',
        answer: 'No there is no limit. It is teacher’s choice.'
      },
      {
        id: 18,
        question: 'Complete assignment needs to be prepared in one shot or can be prepared by part by part?',
        // tslint:disable-next-line: max-line-length
        answer: 'Yes, the assignment can be prepared in parts and save it. After all questions are in place, then it can be published to students.'
      },
      {
        id: 18,
        question: 'What is reporting?',
        // tslint:disable-next-line: max-line-length
        answer: 'Teacher can see the activities what were performed by themselves for selected subject and lesson and can see the complete status of all students for selected subject and lesson.'
      },
    ];
  }

}
