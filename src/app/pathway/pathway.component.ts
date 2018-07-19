import { Component, OnInit } from '@angular/core';
import Materialize from 'materialize-css';

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
