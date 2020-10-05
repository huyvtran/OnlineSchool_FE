import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-video',
    pathMatch: 'full'
  },
  {
    path: 'activity',
    loadChildren: () => import('../activity/activity.module')
    .then( m => m.ActivityPageModule)
  },
  {
    path: 'select-curriculum',
    loadChildren: () => import('../select-curriculum/select-curriculum.module')
    .then(m => m.SelectCurriculumPageModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('../subjects/subjects.module')
    .then(m => m.SubjectsPageModule)
  },
  {
    path: 'subjects/:activityId',
    loadChildren: () => import('../subjects/subjects.module')
    .then(m => m.SubjectsPageModule)
  },
  {
    path: 'lessons',
    loadChildren: () => import('../lessons/lessons.module')
    .then(m => m.LessonsPageModule)
  },
  {
    path: 'lessons/:activityId',
    loadChildren: () => import('../lessons/lessons.module')
    .then(m => m.LessonsPageModule)
  },
  {
    path: 'add-video',
    loadChildren: () => import('../add-video/add-video.module')
    .then(m => m.AddVideoPageModule)
  },
  {
    path: 'videos-list',
    loadChildren: () => import('../add-video/videos-list/videos-list.module')
    .then(m => m.VideosListPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module')
    .then( m => m.DashboardPageModule)
  },
  {
    path: 'listening-lesson',
    loadChildren: () => import('../listening-lesson/listening-lesson.module')
    .then( m => m.ListeningLessonPageModule)
  },
  {
    path: 'reading-lesson',
    loadChildren: () => import('../reading-lesson/reading-lesson.module')
    .then(m => m.ReadingLessonPageModule)
  },
  {
    path: 'open-pdf',
    loadChildren: () => import('../reading-lesson/open-pdf/open-pdf.module')
    .then(m => m.OpenPdfPageModule)
  },
  {
    path: 'side-nav',
    loadChildren: () => import('../side-nav/side-nav.module')
    .then( m => m.SideNavPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('../report/report.module')
    .then( m => m.ReportPageModule)
  },
  /* {
    path: 'rdsubject',
    loadChildren: () => import('../rdsubject/rdsubject.module')
    .then( m => m.RdsubjectPageModule)
  },
  {
    path: 'teacher-doubt',
    loadChildren: () => import('../teacher-doubt/teacher-doubt.module')
    .then( m => m.TeacherDoubtPageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('../assignment/assignment.module')
    .then( m => m.AssignmentPageModule)
  }, */
  {
    path: 'lessons',
    loadChildren: () => import('../lessons/lessons.module')
    .then( m => m.LessonsPageModule)
  },
  {
    path: 'raising-doubt',
    loadChildren: () => import('../raising-doubt/raising-doubt.module')
    .then( m => m.RaisingDoubtPageModule)
  },
  {
    path: 'teacher-doubt',
    loadChildren: () => import('../teacher-doubt/teacher-doubt.module')
    .then( m => m.TeacherDoubtPageModule)
  },
  {
    path: 'answer-question',
    loadChildren: () => import('../answer-question/answer-question.module')
    .then( m => m.AnswerQuestionPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module')
    .then( m => m.ProfilePageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('../report/report.module')
    .then(m => m.ReportPageModule)
  },
  {
    path: 'teacher-master',
    loadChildren: () => import('../teacher-master/teacher-master.module')
    .then( m => m.TeacherMasterPageModule)
  },

  {
    path: 'teacher-subject',
    loadChildren: () => import('../teachersubject/teachersubject.module')
    .then( m => m.TeachersubjectPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('../faq/faq.module')
    .then(m => m.FAQPageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('../assignment/assignment.module')
    .then( m => m.AssignmentPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module')
    .then( m => m.ProfilePageModule)
  },
  {
    path: 'add-assignment',
    loadChildren: () => import('../add-assignment/add-assignment.module')
    .then( m => m.AddAssignmentPageModule)
  },
  {
    path: 'add-assignment/:mode',
    loadChildren: () => import('../add-assignment/add-assignment.module')
    .then( m => m.AddAssignmentPageModule)
  },
  {
    path: 'student-assignment',
    loadChildren: () => import('../student-assignment/student-assignment.module')
    .then( m => m.StudentAssignmentPageModule)
  },
  {
    path: 'student-assignment/:mode',
    loadChildren: () => import('../student-assignment/student-assignment.module')
    .then( m => m.StudentAssignmentPageModule)
  },
  {
    path: 'student-assignmentlist',
    loadChildren: () => import('../student-assignmentlist/student-assignmentlist.module')
    .then( m => m.StudentAssignmentlistPageModule)
  },
  {
    path: 'StudentResultPage',
    loadChildren: () => import('../student-result/student-result.module')
    .then( m => m.StudentResultPageModule)
  },
  {
    path: 'student-dashboard',
    loadChildren: () => import('../student-dashboard/student-dashboard.module')
    .then( m => m.StudentDashboardPageModule)
  },
  {
    path: 'principal-curriculum',
    loadChildren: () => import('../principal-curriculum/principal-curriculum.module')
    .then( m => m.PrincipalCurriculumPageModule)
  },
  {
    path: 'principal-overview',
    loadChildren: () => import('../principal-overview/principal-overview.module')
    .then( m => m.PrincipalOverviewPageModule)
  },

  {
    path: 'teacher-dashboard',
    loadChildren: () => import('../teacher-dashboard/teacher-dashboard.module')
    .then( m => m.TeacherDashboardPageModule)
  },
  {
    path: 'teacher-overview',
    loadChildren: () => import('../teacher-overview/teacher-overview.module')
    .then( m => m.TeacherOverviewPageModule)
  },
  {
    path: 'student-dashboardlist',
    loadChildren: () => import('../student-dashboardlist/student-dashboardlist.module')
    .then( m => m.StudentDashboardlistPageModule)
  },
  {
    path: 'teacher-dashboardlist',
    loadChildren: () => import('../teacher-dashboardlist/teacher-dashboardlist.module')
    .then( m => m.TeacherDashboardlistPageModule)
  },
  {
    path: 'student-master',
    loadChildren: () => import('../student-master/student-master.module')
    .then( m => m.StudentMasterPageModule)
  },
  {
    path: 'studentmaster-curriculum',
    loadChildren: () => import('../studentmaster-curriculum/studentmaster-curriculum.module')
    .then( m => m.StudentmasterCurriculumPageModule)
  },
  {
    path: 'student-subject',
    loadChildren: () => import('../student-subject/student-subject.module')
    .then( m => m.StudentSubjectPageModule)
  },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
})
export class OnlineSchoolRoutingModule { }
