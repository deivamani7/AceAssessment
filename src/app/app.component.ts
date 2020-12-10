import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "ACEDataEntry"

  constructor(private titleService: Title, private metaService: Meta) {

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'ACE, ACECON, Contractors'},
      {name: 'description', content: 'ACECON Application'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

}