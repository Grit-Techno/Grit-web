import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  forgotForm: FormGroup;
  public account_validation_messages = ValidatorList.account_validation_messages;
  constructor(
              private router: Router,
              private fb: FormBuilder,
              public toastr: ToastrService,
              public dataService: DataService,
    ) {
      this.forgotForm = this.fb.group({
        email: ['', Validators.required],
      });
    }

  ngOnInit() {

  }

  forgotPassword() {
    if (this.forgotForm.valid) {
      this.dataService.forgotPassword({email: this.forgotForm.value.email}).subscribe(
        res => {
          if (res.status === true) {
            this.handleResponse(res.message);
          } else if (res.status === false) {
            this.toastr.error(res.message);
        }
        },
        err => {
          this.toastr.error(err.message);
        });
       } else {
      this.validateAllFormFields(this.forgotForm);
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

  handleResponse(res) {
    this.toastr.success(res);
    this.forgotForm.reset();
  }

}
