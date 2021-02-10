import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        // , { queryParams: { returnUrl: state.url }}
      } else {
        return true;
      }
    } catch (err) {
      this.router.navigate(['/login']);
    }
  }
}
