import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

//Quill
import { QuillModule } from 'ngx-quill';

//Components
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './utility/navbar/navbar.component';
import { FooterComponent } from './utility/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { InvitedSpeakerComponent } from './components/invited-speaker/invited-speaker.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { NonInvitedSpeakerComponent } from './components/non-invited-speaker/non-invited-speaker.component';
import { StudentComponent } from './components/student/student.component';
import { authInterceptorProviders } from './services/interceptor/auth.interceptor';
import { SidebarComponent } from './utility/sidebar/sidebar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { EmailModalComponent } from './components/admin/email-modal/email-modal.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { TimeTableComponent } from './components/time-table/time-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    InvitedSpeakerComponent,
    AdminDashboardComponent,
    NonInvitedSpeakerComponent,
    StudentComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileComponent,
    EmailModalComponent,
    ParticipantComponent,
    TimeTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    QuillModule.forRoot(),
    MatMenuModule
  ],
  providers: [authInterceptorProviders, MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
