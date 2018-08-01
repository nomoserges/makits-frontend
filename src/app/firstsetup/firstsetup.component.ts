import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Materialize from 'materialize-css';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';
import { LocationsService } from '../services/locations.service';
import { jquery as $ } from 'jquery';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-firstsetup',
  templateUrl: './firstsetup.component.html',
  styleUrls: ['./firstsetup.component.css']
})
export class FirstsetupComponent implements OnInit {
  // location coords
  public latitude: number;
  public longitude: number;
  // activation informations
  userid: string;
  tokencode: string;
  useremail: string;
  // user form model on view
  userModel: any = {};
  // location form model on view
  locationModel: any = {};
  // image location for preview canvas
  localUrl: any;
  // avatar container
  avatarFile: File = null;
  // arrays of dates
  dobDays: any;
  dobMonths: any;
  dobYears: any;
  // For displaying forms blocks
  personalFormBlock: boolean;
  locationFormBlock: boolean;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private storage: StorageService,
    private locationsService: LocationsService
  ) {
    this.dobDays = userService.dobDays();
    this.dobMonths = userService.dobMonths();
    this.dobYears = userService.dobYear();
    this.localUrl = '../../assets/images/avatar-6.png';
    // this.userid = this.storage.getDatas('user')['userid'];
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
      }
    );
    this.personalFormBlock = true;
    this.locationFormBlock = false;
  }


  /*  Taking image from input to image
    * canvas for previewing*/
   showPreviewImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      this.avatarFile = <File>event.target.files[0];
      reader.readAsDataURL(this.avatarFile);
      reader.onload = (events: any) => {
        this.localUrl = events.target.result;
      };
    }
  }

  /**
   * Submiting user form
   * @param formValue
   */
  submitUserForm(formValue) {
    let params: string = null;
    let serverResponse;
    // let serverResponse: any = null;
    // set blank string where undefined
    // tslint:disable-next-line:forin
    for (const key in formValue) {
      const value = formValue[key];
      if ( formValue[key] === undefined) {
        formValue[key] = '';
      }
    }
    // ------------------ Managing About informations -----------
    // create date of birth variable
    let dobInput: string;
    if ( formValue['dob_day'] === '' || formValue['dob_month'] === '' || formValue['dob_year'] === '') {
      dobInput = '';
    } else {
      dobInput = formValue['dob_year'] + formValue['dob_month'] + formValue['dob_day'];
    }
    params = 'userid=' + this.userid + '&firstname=' + formValue['firstname'] + '&lastname='
    + formValue['lastname'] + '&gender=' + formValue['gender'] + '&dob=' + dobInput;
    this.userService.setPersonal(params).subscribe(res => {
      // console.log('about result: ' + res);
    });
    // ------------------ Managing Activity (Skills) informations -----------
    params = 'userid=' + this.userid + '&job_title=' + formValue['job_title']
    + '&job_description=' + formValue['job_description'];
    this.userService.setJobactivity(params).subscribe(res => {
      console.log('activity result: ' + res);
    });
    // ------------------ Managing Avatar informations -----------
    formValue['image_name'] = this.avatarFile['name'];
    formValue['image_type'] = this.avatarFile['type'];
    formValue['image_size'] = this.avatarFile['size'];
    formValue['image_binary'] = this.localUrl.split(',')[1];
    formValue['userid'] = this.userid;
    this.userService.setAvatar(formValue)
    .subscribe(res => {
      serverResponse = res;
      // console.log('avatar result: ' + res);
      this.storage.setDatas('user', serverResponse.datas);
    });
    // console.log('All form datas: ' + formValue);
    this.personalFormBlock = false;
    this.locationFormBlock = true;
    this.openGeocoding();
  }

  public openGeocoding() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          let serverResponse;
          // const userCoords: String = '3.903574,11.528872';
          let userCoords: String;
          userCoords = position.coords.longitude
          + ',' + position.coords.latitude;
          this.locationsService.googleGeolocation(userCoords)
          .subscribe(res => {
            serverResponse = res;
            let locationInfos: any;
            locationInfos = serverResponse.results[0]['address_components'];
            console.log( locationInfos.length);
            for (let index = 0; index < locationInfos.length; index++) {
              const element = locationInfos[index];
              /* Populating the form with returned values */
              switch (element.types[0]) {
                case 'country':
                this.locationModel.country = element['long_name']
                + ', ' + element['short_name'];
                  break;
                case 'administrative_area_level_1':
                  this.locationModel.region = element['long_name'];
                  break;
                case 'locality':
                  this.locationModel.city = element['long_name'];
                  break;
                case 'Road-route':
                  this.locationModel.city = element['long_name'];
                  break;
              }
            }
          });
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        },
      );
    }
  }

}
