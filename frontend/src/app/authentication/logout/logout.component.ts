import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'logout-page',
  templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    // this.logoutUser();
  }

  // logoutUser() {
  //   this.userService.getindustryList().subscribe((val) => {
  //     if (val.statusCode == 202) {
  //       this.userService.purgeAuth();
  //       this.router.navigate(['']);
  //     } else {
  //       this.toastr.error(val.message);
  //     }
  //   },
  //     err => {
  //       this.toastr.error(err.message);
  //       return false;
  //     });

  // }
}
