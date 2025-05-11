import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from '@core/constants/auth';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  readonly ROLES = ROLES;

  alertKey: string;
  tab: number = 0;

  constructor(private router: Router) {
    this.alertKey = this.router.url;
    const navState = this.router.getCurrentNavigation().extras
      ? this.router.getCurrentNavigation().extras.state
      : null;
    if (navState && navState.tab) {
      this.tab = navState ? navState.tab : null;
    }
  }

  ngOnInit(): void {

  }

  onOpenAddNewListing(){
    //window.open("https://www.homeappter.com/addnewlisting", "_blank");
    this.router.navigate(['/home/listings/add-new-listing'],
      {
       // queryParams,
       // skipLocationChange: true
      }
    );
  }

  onBackToAdminDashboard() {
    this.router.navigate(['/home'], {
      state: {
        tab: 1 // search listing tab
      },
    });
  }

}
