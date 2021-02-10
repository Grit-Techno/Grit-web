import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constant} from '../../../constants/constant';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { countryStatesList } from 'src/constants/countrysState';
interface Study {
  name: string;
}

@Component({
  selector: 'app-learner-complete-profile',
  templateUrl: './learner-complete-profile.component.html',
  styleUrls: ['./learner-complete-profile.component.css']
})

export class LearnerCompleteProfileComponent implements OnInit {
  completeProfileForm: FormGroup;
  constant: any = constant;
  public account_validation_messages = ValidatorList.account_validation_messages;
  livingExpensive: string;
  hideProgram: boolean;
  isEnable: boolean;
  tempArray: any = [];
  countryStateList: { 'id': number; 'name': string}[];
  states: { country_id: number; name: string; }[];
  livingExp: any;
  stateArray: any;
  studyArray: { item_id: number; item_text: string; }[];
  dropdownSettings: any = {};
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  constructor(
    private router: Router,
    private dataService: DataService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private authservice: AuthService,
  ) {
    this.completeProfileForm = fb.group({
      country:  ['', [Validators.required]],
      state:  ['', [Validators.required]],
      study:  ['', [Validators.required]],
      living_expenses:  [false, [Validators.required]],
      program: ['no', [Validators.required]],
      program_value: [],
    });

    this.studyArray = [
      { item_id: 1, item_text: 'Technical Sales' },
      { item_id: 2, item_text: 'Digital Marketing' },
      { item_id: 3, item_text: 'Web Development' },
      { item_id: 4, item_text: 'Web Design' },
      { item_id: 5, item_text: 'Data Science' },
      { item_id: 6, item_text: 'Data Analytics' },
      { item_id: 7, item_text: ' Cyber Security' },
      { item_id: 8, item_text: 'Data Analytics' },
      { item_id: 9, item_text: 'A.I. or Machine Learning' },
      { item_id: 10, item_text: 'Something Else' },
      { item_id: 11, item_text: 'I don’t know yet' }
  ];
  }

  ngOnInit() {
    this.countryStateList = countryStatesList.countrysStateName;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
  };
  }

  completeProfile() {
    if (!this.completeProfileForm.valid) {
      // this.isEnable = true;
      this.validateAllFormFields(this.completeProfileForm);
      return;
    } else {
      // this.isEnable = false;
      const completeProfile = {
        country : this.completeProfileForm.value.country,
        state : this.completeProfileForm.value.state,
        study : this.completeProfileForm.value.study,
        program : this.completeProfileForm.value.program_value,
        living_expenses : this.livingExp,
      };
      this.dataService.completeProfile(completeProfile).subscribe(
        (res: any) => {
        if (res.status === true) {
          this.tokenService.sendUserData(JSON.stringify(res.data));
          this.authservice.changeAuthStatus(true);
          this.router.navigateByUrl('/learner-home');
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

  enDsProgram(value) {
    if (value === false) {
      this.completeProfileForm.value.program_value = null;
    }
    this.hideProgram = value === true ? true : false;
    this.isEnable = value === true ? true : false;
  }

  enDsExpense(value) {
   this.livingExp = value;
   console.log( this.livingExp);
  }

  getState(event) {
    this.countryStateList.forEach(element => {
      if (element.id === event) {
        this.tempArray.push(element);
      }
   });
    this.tempArray.forEach(element => {
      this.states = element.states;
   });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }
}
