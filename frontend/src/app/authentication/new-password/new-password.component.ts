import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { constant } from '../../../constants/constant';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  resetToken: null;
  forgotPassForm: FormGroup;
  pass = '';
  submitted = false;
  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              public toastr: ToastrService,
              private fb: FormBuilder,
              ) {
    route.queryParams.subscribe(params => {
      this.resetToken = params.token;
    });

    this.forgotPassForm = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern(constant.regEx.passwordRegEx)])],
      password_confirmation: ['', [Validators.required]],
      email:  ['', [Validators.required]]

    },
    { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(formGroup: FormGroup) {
      return formGroup.get('password').value === formGroup.get('password_confirmation').value
        // tslint:disable-next-line:object-literal-key-quotes
        ? null : { 'mismatch': true };
    }

onSubmit() {
  if (!this.forgotPassForm.valid) {
    this.submitted = true;
  } else {
    this.submitted = false;
    const passwordReset = {
      password : this.forgotPassForm.value.password,
      password_confirmation : this.forgotPassForm.value.password_confirmation,
      email : this.forgotPassForm.value.email,
      resetToken : this.resetToken,
    };
    this.dataService.changePassword(passwordReset).subscribe(
      (res: any) => {
      if (res.status === true) {
        this.router.navigate(['/login']);
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    },
    err => {
      this.toastr.error(err.message);
    });
 }
}





ngOnInit() {
}
}
