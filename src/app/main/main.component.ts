import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent
} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUrl: string;

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
      }
    });
  }

  ngOnInit() {
    if (this.storage.checkSession() === true) {
      /* console.log('user logged'); */
    } else {
      // this.router.navigate(['/out']);
    }
  }

}
