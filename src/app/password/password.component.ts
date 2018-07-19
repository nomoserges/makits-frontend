import { Component, OnInit } from '@angular/core';
import Materialize from "materialize-css";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit {
  formModel: any = {};

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    let params = "email="+this.formModel.useremail;
    let serverResponse;
    this.userService.sendemailToResetPassword(params).subscribe(res => { 
        //console.log(res);
        serverResponse = res;
        if ( serverResponse.status == 'nok') {
          Materialize.toast({html: serverResponse.message, classes: 'red darken-1 rounded'});
        } else {
          // proccess for local storage and setting up the account
          Materialize.toast({html: serverResponse.message, classes: 'blue lighten-1 rounded'});
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
