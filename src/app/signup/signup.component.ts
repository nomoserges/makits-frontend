import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Materialize from 'materialize-css';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  formModel: any = {};

  constructor (
    private usersService: UsersService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    // do stuff here....
  }

  onSubmit() {
    const params = 'pseudo=' + this.formModel.pseudo + '&email='
    + this.formModel.email + '&password=' + this.formModel.password + '&password_confirmation='
    + this.formModel.password_confirmation;
    let serverResponse;
    this.usersService.setRegister(params).subscribe(res => {
      /* console.log(res); */
      serverResponse = res;
      if ( serverResponse.status === 'nok') {
        Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
      } else {
        // proccess for local storage
        Materialize.toast({html: serverResponse.message, classes: 'blue lighten-1 rounded'});
        // this.storage.setDatas('user', serverResponse.datas);
        // this.router.navigate(['/']);
      }
    },
    err => {
      console.log(err.error.errors);
      if ( err.status === 422) {
        let emailError = '';
        let pseudoError = '';
        let passwordError = '';
        if ( err.error.errors.email !== undefined ) {
          emailError = err.error.errors.email;
        }
        if ( err.error.errors.pseudo !== 'undefined' ) {
          pseudoError = err.error.errors.pseudo;
        }
        if ( err.error.errors.password !== 'undefined' ) {
          passwordError = err.error.errors.password;
        }
        Materialize.toast({html: pseudoError + '<br>'
        + emailError + '<br>' + passwordError, classes: 'red darken-1 rounded'});
      }
    });
  }
}
