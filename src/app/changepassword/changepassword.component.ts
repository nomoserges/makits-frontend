import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { Router } from '@angular/router'; */
import Materialize from 'materialize-css';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})


export class ChangepasswordComponent implements OnInit {
  formModel: any = {};
  webserviceError: boolean;
  tokencode: string;
  useremail: string;
  userStorage: any = {};
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private storage: StorageService
  ) {}

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
          this.webserviceError = true;
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
        } else {
          // proccess for local storage and setting up the account
          // So, we redirect the user to other route
          this.storage.setDatas('user', serverResponse.datas);
          this.userStorage = serverResponse.datas;
          this.webserviceError = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  /**
   * Submitting the form
   */
  onSubmit() {
    const params = 'userid=' + this.userStorage.userid
      + '&password=' + this.formModel.password
      + '&password_confirmation=' + this.formModel.password_confirmation;
    let serverResponse;
    this.userService.changePassword(params).subscribe(res => {
        serverResponse = res;
        if ( serverResponse.status === 'nok') {
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
        } else {
          Materialize.toast({
            html: serverResponse.message,
            classes: 'blue lighten-1 rounded',
            delay: 4000
          });
          // this.router.navigate(['/']);
          window.open('/', '_self');
        }
      },
      err => {
        if ( err.status === 422) {
          let passwordError = '';
          if ( err.error.errors.password !== undefined ) {
            passwordError = err.error.errors.password;
          }
          Materialize.toast({html: passwordError, classes: 'red darken-1 rounded'});
        }
      }
    );
  }

}
