import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constant} from '../../../constants/constant';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-register-learner',
  templateUrl: './register-learner.component.html',
  styleUrls: ['./register-learner.component.css']
})
export class RegisterLearnerComponent implements OnInit {
  LearnerRegisterForm: FormGroup;
  completeProfileForm: FormGroup;
  constant: any = constant;
  public account_validation_messages = ValidatorList.account_validation_messages;
  stepFirst: boolean;
  livingExpensive: string;
  hideProgram: boolean;
  isEnable: boolean;
  states: [{ country_id: number; name: string; }];
  tempArray: any = [];
  countryList: { 'id': number; 'name': string}[];
  statesList: { 'country_id': number; 'name': string}[];
  constructor(
    private router: Router,
    private dataService: DataService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private authservice: AuthService,
  ) {
    this.LearnerRegisterForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  register() {
    if (this.LearnerRegisterForm.valid) {
      const credentials = {
        first_name: this.LearnerRegisterForm.value.first_name,
        last_name: this.LearnerRegisterForm.value.last_name,
        email: this.LearnerRegisterForm.value.email,
        password: this.LearnerRegisterForm.value.password,
        device_type: 'website',
        role: 'Learner',
      };
      this.dataService.registerLearner(credentials).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.tokenService.handle(res.data.token);
            this.router.navigate(['/learner-complete-profile']);
            this.toastr.success(res.message);
          } else {
            this.toastr.error(res.message);
          }
        },
        err => {
          this.toastr.error(err.message);
        });
    } else {
      this.validateAllFormFields(this.LearnerRegisterForm);
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

}
