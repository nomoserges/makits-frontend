import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent
} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {
  /* Content family to display in template  */
  contentFamily: string;
  /* We capture de url parameters */
  urlParameter: string;
  private sub: any;
  /*  Sample datas  */
  contentPosts = [
    { contentID: '123', username: 'Chris Coyler', JobTitle: 'Student',
      dealName: 'Lorep Ipsum in dolor.', cat: 'Food', price: '400$ US',
      desc: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit. Consec tetur adipisicing elit dignissim dapib tumst.',
      record_date: '2017-11-17 11:00:00', distance: '2000 m'},
    { contentID: '123', username: 'Chris Coyler', JobTitle: 'Student',
      dealName: 'Lorep Ipsum in dolor.', cat: 'Food', price: '400$ US',
      desc: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit. Consec tetur adipisicing elit dignissim dapib tumst.',
      record_date: '2017-11-17 11:00:00', distance: '2000 m'},
    { contentID: '123', username: 'Chris Coyler', JobTitle: 'Student',
      dealName: 'Lorep Ipsum in dolor.', cat: 'Food', price: '400$ US',
      desc: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit. Consec tetur adipisicing elit dignissim dapib tumst.',
      record_date: '2017-11-17 11:00:00', distance: '2000 m'},
    { contentID: '123', username: 'Chris Coyler', JobTitle: 'Student',
      dealName: 'Lorep Ipsum in dolor.', cat: 'Food', price: '400$ US',
      desc: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit. Consec tetur adipisicing elit dignissim dapib tumst.',
      record_date: '2017-11-17 11:00:00', distance: '2000 m'},
    { contentID: '123', username: 'Chris Coyler', JobTitle: 'Student',
      dealName: 'Lorep Ipsum in dolor.', cat: 'Food', price: '400$ US',
      desc: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit. Consec tetur adipisicing elit dignissim dapib tumst.',
      record_date: '2017-11-17 11:00:00', distance: '2000 m'},
    { contentID: '123', username: 'Chris Coyler', JobTitle: 'Student',
      dealName: 'Lorep Ipsum in dolor.', cat: 'Food', price: '400$ US',
      desc: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit. Consec tetur adipisicing elit dignissim dapib tumst.',
      record_date: '2017-11-17 11:00:00', distance: '2000 m'}
    ];

  userDetails = {
    firstName : 'Serge Anselme',
    lastName : 'Mvilongo Nomo',
    gender: 'Male',
    birth: '1980-01-01',
    jobTitle: 'Software Archictect',
    jobTags: 'Angular, Javascript, PHP, Laravel, Codeigniter, TypeScript',
    phoneNumbers : [
      {phoneValue: '+237672 49 68 68'},
      {phoneValue: '+237694 08 89 48'},
      {phoneValue: '+237666 88 28 89'},
      {phoneValue: '+237661 00 09 88'},
    ],
    emails: [
      {emailValue: 'nomoserges@gmail.com'},
      {emailValue: 'nomo_serges@yahoo.fr'},
      {emailValue: 'nomo.serges@live.fr'},
    ]
  };
  peoples = [
    {peopleID: '123', fullname: 'Chris Coyler', jobtitle: 'Student', distance: '2000 m'},
    {peopleID: '124', fullname: 'Rachel Smith', jobtitle: 'Top Model', distance: '450 m'},
    {peopleID: '125', fullname: 'Gregor Adams', jobtitle: 'Mechanic Engineer', distance: '700 m'},
    {peopleID: '126', fullname: 'Sarah Drasner', jobtitle: 'Accounter', distance: '1 Km'},
    {peopleID: '127', fullname: 'Jack Thomson', jobtitle: 'No worker', distance: '2 Km'}
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    /* We get navigation event to know
    * which family of content to load */
    // this.contentFamily = this.router.url;
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        this.contentFamily = event.url;
      }
    });
  }

  ngOnInit() {}

}
