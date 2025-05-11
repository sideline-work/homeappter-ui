import { Component, OnInit } from '@angular/core';
import { LoginData } from '@core/models/session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  memberDetails: LoginData;

  constructor() { }

  ngOnInit(): void {
    this.memberDetails =  JSON.parse(localStorage.getItem('currentUser'));
  }

}
