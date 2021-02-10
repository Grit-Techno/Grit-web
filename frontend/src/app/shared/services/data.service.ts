import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class  DataService {
  constructor(
    private http: HttpClient,
    ) {}
  /**
   * Get Drivers Data.
   */
  getusers(data): Observable<any> {
      return this.http.post(`${environment.base_url}admin/get_users`, data);
  }

  login(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/login`, data);
  }

registerLearner(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/learner/signup`, data);
  }

  registerInvester(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/invester/signup`, data);
  }

  forgotPassword(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/sendPasswordResetLink`, data);
  }

  changePassword(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/resetPassword`, data);
  }

  updateProfile(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/updateProfile`, data);
  }

  completeProfile(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/complete/profile`, data);
  }

  getProfileDetail(): Observable<any> {
    return this.http.get(`${environment.base_url}api/getProfile`);
  }

  checkProfileStep(): Observable<any> {
    return this.http.get(`${environment.base_url}api/checkProfile`);
  }

  getLearnerHomeData(): Observable<any> {
    return this.http.get(`${environment.base_url}api/getlearnerhome`);
  }

  makePayment(data): Observable<any> {
    return this.http.post(`${environment.base_url}api/makepayment`, data);
  }

}
