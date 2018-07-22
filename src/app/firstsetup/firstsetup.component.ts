import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Materialize from 'materialize-css';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';
import { LocationsService } from '../services/locations.service';
import { jquery as $ } from 'jquery';


@Component({
  selector: 'app-firstsetup',
  templateUrl: './firstsetup.component.html',
  styleUrls: ['./firstsetup.component.css']
})
export class FirstsetupComponent implements OnInit {
  userid: string;
  // states of wizard forms
  formPersonal: boolean;
  formActivity: boolean;
  formAvatar: boolean;
  formLocation: boolean;
  // form models
  personalModel: any = {};
  activityModel: any = {};
  avatarModel: any = {};
  locationModel: any = {};

  // image location for preview canvas
  localUrl: any;
  // avatar container
  avatarFile: File;
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
    private storage: StorageService,
    private locationsService: LocationsService
  ) {
    this.formPersonal = true;
    this.formLocation = false;
    this.formAvatar = false;
    this.formActivity = false;

    this.dobDays = userService.dobDays();
    this.dobMonths = userService.dobMonths();
    this.dobYears = userService.dobYear();
    this.localUrl = '../../assets/images/avatar-6.png';
    this.userid = this.storage.getDatas('user')['userid'];
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
        this.userid = this.storage.getDatas('user')['userid'];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  /*  Show the avatar wizard 2 and hide personal */
  showActivityForm() {
    this.formActivity = true;
    this.formPersonal = false;
    this.formLocation = false;
    this.formAvatar = false;
  }

  /*  Show the avatar wizard 2 and hide personal */
  showAvatarForm() {
    this.formPersonal = false;
    this.formActivity = false;
    this.formLocation = false;
    this.formAvatar = true;
  }

  /*  Show the location form and hide avatar */
  showLocationForm() {
    this.formPersonal = false;
    this.formActivity = false;
    this.formAvatar = false;
    this.formLocation = true;
    // launch GPS location capabilities
    this.locationsService.activeGPS();
  }

  /* Submit personal form */
  submitPersonal(formValue) {
    // set blank string where undefined
    // tslint:disable-next-line:forin
    for (const key in formValue) {
      const value = formValue[key];
      if ( formValue[key] === undefined) {
        formValue[key] = '';
      }
    }
    // create date of birth variable
    let dobInput: string;
    if ( formValue['dob_day'] === '' || formValue['dob_month'] === '' || formValue['dob_year'] === '') {
      dobInput = '';
    } else {
      dobInput = formValue['dob_year'] + formValue['dob_month'] + formValue['dob_day'];
    }
    const params = 'userid=' + this.userid + '&firstname=' + formValue['firstname'] + '&lastname='
    + formValue['lastname'] + '&gender=' + formValue['gender'] + '&dob=' + dobInput;
    let serverResponse;
    this.userService.setPersonal(params).subscribe(res => {
      serverResponse = res;
        if ( serverResponse.status === 'nok') {
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
        } else {
          // We update the localstorage
          this.storage.setDatas('user', serverResponse.datas);
          // we open the next form (activity form)
          this.showActivityForm();
        }
    });
  }

  /**
   * Submit the activity form
   * @param formValue
   */
  submitActivity(formValue) {
    // set blank string where undefined
    // tslint:disable-next-line:forin
    for (const key in formValue) {
      const value = formValue[key];
      if ( formValue[key] === undefined) {
        formValue[key] = '';
      }
    }
    const params = 'userid=' + this.userid + '&job_title=' + formValue['job_title']
    + '&job_description=' + formValue['job_description'];
    let serverResponse;
    this.userService.setJobactivity(params).subscribe(res => {
      serverResponse = res;
        if ( serverResponse.status === 'nok') {
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
        } else {
          // We update the localstorage
          this.storage.setDatas('user', serverResponse.datas);
          // we open the next form (activity form)
          this.showAvatarForm();
        }
    });
  }

  /*  Taking image from input to image
    * canvas for previewing*/
   showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (events: any) => {
        this.localUrl = events.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.avatarFile = event.target.files[0];
  }

  /**
   * Submit avatar form
   */
  submitAvatar(formValue, event: any) {
    const uploadData = new FormData();
    uploadData.append('useravatar', this.avatarFile);
    uploadData.append('userid', this.userid);
    console.log(uploadData);
    // set blank string where undefined
    // tslint:disable-next-line:forin
    for (const key in formValue) {
      const value = formValue[key];
      if ( formValue[key] === undefined) {
        formValue[key] = '';
      }
    }
    formValue['userid'] = this.userid;
    let serverResponse;
    console.log(formValue.name);
    this.userService.setAvatar(formValue).subscribe(res => {
      serverResponse = res;
      console.log(serverResponse);
    });

  }
}
