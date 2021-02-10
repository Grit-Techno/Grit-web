import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService {

  constructor(
    private router: Router,
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          this.router.navigate(['/learner-home']);
          return false;
        } else {
          console.log('no-auth-guard is calling...');
          return true;
        }
      } catch (err) {
        this.router.navigate(['/login']);
      }
    }


  }


