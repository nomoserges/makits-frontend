import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: StorageService
  ) {
    this.storage.clear();
    // this.router.navigate(['/out']);
    window.open('/out', '_self');
  }

  ngOnInit() {
    // this.router.navigate(['/out']);
  }

}
