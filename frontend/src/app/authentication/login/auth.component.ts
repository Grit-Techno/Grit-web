import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  public account_validation_messages = ValidatorList.account_validation_messages;

  constructor(
    private router: Router,
    private authservice: AuthService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    public dataService: DataService
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.userService.purgeAuth();
  }

  login() {
    if (this.authForm.valid) {
      const credentials = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
        device_type: 'website'
      };
      console.log(credentials);
      this.dataService.login(credentials).subscribe(res => {
        console.log(res, 'lldsjfgsajhdfashdfsajhdfsajydfsajdsafdjy');
        if (res.status === true) {
            this.handleResponse(res.data);
          } else if (res.status === false) {

            console.log(res, 'ojogfjydhsrfgvkjmdsdsadgv');
            this.toastr.error(res.message);
          }
        },
        err => {
          this.toastr.error(err.message);
        });
    } else {
      this.validateAllFormFields(this.authForm);
      return;
    }

  }

  handleResponse(data) {
    this.tokenService.handle(data.token);
    this.tokenService.sendUserData(JSON.stringify(data));
    this.authservice.changeAuthStatus(true);
    if (data.role === 'Invester') {
      this.router.navigate(['/investor-home']);
      } else if (data.role === 'Learner' && data.profile_complete === true) {
        this.router.navigate(['/learner-home']);
        } else {
          this.router.navigate(['learner-complete-profile']);
          this.toastr.info('Please complete your profile first');
        }
  }

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  });
}

}
