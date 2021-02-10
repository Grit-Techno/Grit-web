import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/constants/constant';
import { ValidatorList } from 'src/app/shared/services/validator.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
enum CheckBoxType { ten, fifty , hun, twohun, NONE }
@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.css']
})
export class DonateNowComponent implements OnInit {
  donateToGritForm: FormGroup;
  constant: any = constant;
  public account_validation_messages = ValidatorList.account_validation_messages;
  selectedAmount: any;
  amount = [{amount: '$10'}, {amount: '$50'}, {amount: '$100'}, {amount: '$200' }];
  checkBoxType = CheckBoxType;
  currentlyChecked: CheckBoxType;
  amtError: boolean;

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private router: Router,
    private dataService: DataService) {
   }

  ngOnInit() {

  }


  donateNow() {
    if (!this.selectedAmount) {
      this.amtError = true;
      return;
    }
    // if (this.donateToGritForm.valid) {
    // } else {
    this.router.navigate(['/payment']);
      // this.validateAllFormFields(this.donateToGritForm);
      // return;
    // }

  }

  selectAmount(targetType: CheckBoxType, amount) {
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }
    this.selectedAmount = amount;
    this.amtError = false;
    console.log(this.selectedAmount);
    this.currentlyChecked = targetType;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }
}
