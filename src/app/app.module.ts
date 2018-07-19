import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
/* import { Router } from '@angular/router'; */

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PasswordComponent } from './password/password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { StorageService } from './services/storage.service';
import { UsersService } from './services/users.service';
import { FirstsetupComponent } from './firstsetup/firstsetup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MainComponent } from './main/main.component';
import { PathwayComponent } from './pathway/pathway.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SignoutComponent } from './signout/signout.component';
import { ContentComponent } from './content/content.component';
/**
 * Routes configuration
 */
const routes: Routes = [
  /*{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PathwayComponent },*/
  { path: '', component: MainComponent, children: [
    { path: '', redirectTo: 'content/', pathMatch: 'full' },
    { path: 'content', component: ContentComponent },
    { path: 'content/:groupname', component: ContentComponent },
    { path: 'myprofile', component: MyprofileComponent },
  ]},
  { path: 'signout', component: SignoutComponent },
  { path: 'out', children: [
    { path: '', component: SigninComponent },
    { path: 'login', component: SigninComponent },
    { path: 'register', component: SignupComponent },
    { path: 'resetpassword/:tokencode/:useremail', component: ChangepasswordComponent },
    { path: 'setupaccount/:tokencode/:useremail', component: FirstsetupComponent},
    { path: 'recover-pass', component: PasswordComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    SigninComponent,
    SignupComponent,
    FirstsetupComponent,
    ChangepasswordComponent,
    MainComponent,
    PathwayComponent,
    MyprofileComponent,
    SignoutComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [UsersService, StorageService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor (
    private storage: StorageService,
    private router: Router
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }
 }
