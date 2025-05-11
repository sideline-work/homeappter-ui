import { Component } from '@angular/core';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAVS4S1D1LtXx1yMql0TV26D2QN9TgSnm8',
  databaseURL: 'https://homeappter-default-rtdb.firebaseio.com/'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'homeappter';

  constructor() {
    firebase.initializeApp(config);
  }
}
