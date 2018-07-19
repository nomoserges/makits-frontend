import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Materialize from 'materialize-css';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';
import { jquery as $ } from 'jquery';


@Component({
  selector: 'app-firstsetup',
  templateUrl: './firstsetup.component.html',
  styleUrls: ['./firstsetup.component.css']
})
export class FirstsetupComponent implements OnInit {
  // states of wizard forms
  formPersonal: boolean;
  formActivity: boolean;
  formAvatar: boolean;
  // form models
  personalModel: any = {};
  activityModel: any = {};
  avatarModel: any = {};
  // arrays of dates
  dobDays: any;
  dobMonths: any;
  dobYears: any;

  webserviceError: boolean;
  tokencode: string;
  useremail: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private storage: StorageService
  ) {
    this.formPersonal = true;
    this.formActivity = false;
    this.formAvatar = false;

    this.dobDays = userService.dobDays();
    this.dobMonths = userService.dobMonths();
    this.dobYears = userService.dobYear();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      params => {
        this.tokencode = params['tokencode'];
        this.useremail = params['useremail'];
      }
    );
    // Starting deal with webservice
    const params = 'token=' + this.tokencode
      + '&email=' + this.useremail;
      let serverResponse;
    this.userService.confirmEmailAccount(params).subscribe(res => {
        serverResponse = res;
        if ( serverResponse.status === 'nok') {
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
          // we redirect user to login screen
        } else {
          /* proccess for local storage and setting up the account
          * So, we redirect the user to other route
          * */
         Materialize.toast({html: serverResponse.message, classes: 'blue darken-4 rounded'});
        this.storage.setDatas('user', serverResponse.datas);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  /*  Show the activity wizard 2 and hide personal */
  showActivityForm() {
    this.formPersonal = false;
    this.formActivity = true;
    this.formAvatar = false;
  }

  /*  Show the avatar wizard 2 and hide activity */
  showAvatarForm() {
    this.formPersonal = false;
    this.formActivity = false;
    this.formAvatar = true;
  }

  /* Submit personal form */
  submitPersonal(formValue) {
    // tslint:disable-next-line:forin
    for (const key in formValue) {
      const value = formValue[key];
      // console.log(key +' => '+ value);
      if ( formValue[key] === undefined) {
        formValue[key] = '';
      }
    }
    console.log(formValue);
  }

}
