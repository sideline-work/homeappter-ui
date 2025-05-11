import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@core/http';
import { SessionService } from '@core/services';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    }
  }
}
