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
    // we'll if there is localstorage datas
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
        Materialize.toast({
          html: serverResponse.message,
          classes: 'blue lighten-5 blue-text text-darken-4 rounded'
        });
        // this.storage.setDatas('user', serverResponse.datas);
        // this.router.navigate(['/']);
      }
    });
  }
}
