import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@core/http';
import { SessionService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.sessionService.isLoggedIn()) {
        return true;
      } else {
        const user = localStorage.getItem('currentUser');
        if (user) {
          this.sessionService.setCurrentUser(JSON.parse(user));
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }
  }

}
