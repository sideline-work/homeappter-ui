import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/http';
import { LoginData } from '@core/models/session';
import { Router } from '@angular/router';
import { SessionService } from '@core/services';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  memberDetails: LoginData;

  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.memberDetails =  JSON.parse(localStorage.getItem('currentUser'));
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
    // this.authService.logout().subscribe(
    //   (res) => {
    //     this.router.navigate(['/session/login']);
    //   },
    //   (err: any) => {
    //   }
    // );
  }

  onViewProfile() {
    this.router.navigate(['/home/member']);
  }

}
