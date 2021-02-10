import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private userData = new BehaviorSubject<any>({});
  public data = this.userData.asObservable();

  private iss = {
    login: 'http://127.0.0.1:8000/api/login',
    signup: 'http://127.0.0.1:8000/api/signup'
  };

  constructor(private router: Router) { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  sendUserData(data) {
    this.userData.next(data);
  }
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    try {
    const token = this.get();
    if (token) {
        // this.router.navigate(['/login']);
        return true;
        // , { queryParams: { returnUrl: state.url }}
      } else {
        // this.router.navigate(['/']);
        return false;
      }
    } catch (err) {
      this.router.navigate(['/login']);
    }

    // if (!token) {
    //   this.router.navigate(['/login']);
    //   // const payload = this.payload(token);
    //   // if (payload) {
    //   //   return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
    //   // }
    // }
    // console.log('ye rhaaa');
    // return false;
  }

  // payload(token) {
  //   const payload = token.split('.')[1];
  //   return this.decode(payload);
  // }

  // decode(payload) {
  //   return JSON.parse(atob(payload));
  // }

  loggedIn() {
    return this.isValid();
  }
}
