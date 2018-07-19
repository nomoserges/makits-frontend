import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  userData: any = {};

  constructor(
    private storage: StorageService
  ) {
    this.userData = storage.getDatas('user');
   }

  ngOnInit() {
    console.log(this.userData);
  }

}
