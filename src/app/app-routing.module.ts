import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { InvitedSpeakerComponent } from './components/invited-speaker/invited-speaker.component';
import { NonInvitedSpeakerComponent } from './components/non-invited-speaker/non-invited-speaker.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { StudentComponent } from './components/student/student.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { AdminGuard } from './services/gaurd/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        component : DashboardComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'non-invited',
    component: NonInvitedSpeakerComponent,
    pathMatch: 'full'
  },
  {
    path: 'invited',
    component: InvitedSpeakerComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'student',
    component: StudentComponent,
    pathMatch: 'full'
  },
  {
    path: 'participant',
    component: ParticipantComponent,
    pathMatch: 'full'
  },
  {
    path: 'time-table',
    component: TimeTableComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
