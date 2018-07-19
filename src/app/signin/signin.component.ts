import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Materialize from 'materialize-css';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  title = 'Makits - Signin';
  formModel: any = {};
  constructor(
    private userService: UsersService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() {
    if (this.storage.checkSession() === true) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    const params = 'credential=' + this.formModel.credential
      + '&password=' + this.formModel.password;
    let serverResponse;
    this.userService.setLogin(params).subscribe(res => {
        /* console.log(res); */
        serverResponse = res;
        if ( serverResponse.status === 'nok') {
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
        } else {
          // proccess for local storage and setting up the account
          Materialize.toast({
            html: serverResponse.message,
            classes: 'blue lighten-1 rounded'
          });
          this.storage.setDatas('user', serverResponse.datas);
          window.open('/', '_self');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
