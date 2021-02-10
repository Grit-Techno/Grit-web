import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constant} from '../../../constants/constant';
import { TokenService } from 'src/app/shared/services/token.service';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register-invester',
  templateUrl: './register-invester.component.html',
  styleUrls: ['./register-invester.component.css']
})
export class RegisterInvesterComponent implements OnInit {
  RegisterForm: FormGroup;
  constant: any = constant;
  public account_validation_messages = ValidatorList.account_validation_messages;
  constructor(
    private router: Router,
    private dataService: DataService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private authservice: AuthService,
  ) {
    this.RegisterForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      // password: ['', Validators.required],

    });
  }

  ngOnInit() {
  }

  register() {
    if (this.RegisterForm.valid) {
      const credentials = {
        first_name: this.RegisterForm.value.first_name,
        last_name: this.RegisterForm.value.last_name,
        email: this.RegisterForm.value.email,
        // password: this.RegisterForm.value.password,
        device_type: 'website',
        role: 'Invester',
      };
      this.dataService.registerInvester(credentials).subscribe(
        (res: any) => {
          if (res.status === true) {
            // this.tokenService.handle(res.data.token);
            // this.tokenService.sendUserData(JSON.stringify(res.data));
            // this.authservice.changeAuthStatus(true);
            // if (res.data.role === 'Invester') {
            // this.router.navigate(['/investor-home']);
              // } else if (res.data.role === 'Learner') {
              //   }
              this.router.navigate(['/']).then(() => {
                this.toastr.success('Thank you for signing up.Welcome to the Grit Community!');
            });
                // this.toastr.success('Thank you for signing up.Welcome to the Grit Community!');
                // this.router.navigate(['/']);
            // this.RegisterForm.reset();
          } else {
            this.toastr.error(res.message);
          }
        },
        err => {
          this.toastr.error(err.message);
        });
    } else {
      this.validateAllFormFields(this.RegisterForm);
      return;
    }

  }
validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  });
}

openModal() {
  const buttonModal = document.getElementById("openModalButton")
  console.log('buttonModal', buttonModal);
  buttonModal.click();
}

}
