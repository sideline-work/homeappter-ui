import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  environmentString: string;

  constructor() { }

  ngOnInit(): void {
    console.log(environment);
    if(environment) {
      console.log(environment);
      switch(environment.apiUrl)  {
        case "https://api.devappter.com/dev": this.environmentString = "DEV Environment";
          break;
        default:
          break;
      }

    }
  }

}
