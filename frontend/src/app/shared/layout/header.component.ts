import { Component, OnInit, EventEmitter, ViewEncapsulation, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./layout.component.css']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  status: boolean = false;
  public loggedIn: boolean;
  notComplete: boolean;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private Auth: AuthService,
    private dataService: DataService,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.tokenService.data.subscribe(
      value => {
        this.notComplete = value;
      });

    if (this.loggedIn === true ) {
    this.checkProfileStep();
    }
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenService.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  closeCollapse() {
    this.status = !this.status;
  }

  checkProfileStep() {
    this.dataService.checkProfileStep().subscribe(
      (res: any) => {
        if (res.status === false) {
          this.notComplete = false;
          this.router.navigate(['learner-complete-profile']);
          this.toastr.info('Please complete your profile first');
        } else {
          this.notComplete = true;
          // this.router.navigate(['learner-home']);
          // this.toastr.error(res.message);
        }
      },
      err => {
        this.toastr.error(err.message);
      });
  }
}
