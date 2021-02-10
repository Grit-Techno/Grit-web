import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean = true) {
    this.loggedIn.next(value);
  }
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    ) {}
}
