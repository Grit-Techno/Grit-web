import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { constant } from '../../../constants/constant';
import { countryStatesList } from '../../../constants/countrysState';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  countryList: { 'id': number; 'name': string}[];
  updateProfileForm: FormGroup;
  public account_validation_messages = ValidatorList.account_validation_messages;
  constant: any = constant;
  hideProgram: boolean;
  isEnable: boolean;
  tempArray: any = [];
  countryStateList: { 'id': number; 'name': string}[];
    states: { country_id: number; name: string; }[];
  // states: { country_id: number; name: string; }[];
  imageUrl: string | ArrayBuffer;
  skillArray: { id: number; skill: string; }[];
  dropdownSettings: any = {};
  selectedItems: any = [];
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  alreadySelected: any;
  program: string;
  livingExp: any;
  constructor(
    private dataService: DataService,
    public toastr: ToastrService,
    private fb: FormBuilder) {
      this.updateProfileForm = fb.group({
        first_name:  ['', [Validators.required]],
        last_name:  ['', [Validators.required]],
        email:  [''],
        country:  ['', [Validators.required]],
        state:  ['', [Validators.required]],
        skill:  ['', [Validators.required]],
        living_expenses:  [false, [Validators.required]],
        program: ['no', [Validators.required]],
        program_value: [],
        profilePic: []
      });

      this.skillArray = [
        { id: 1, skill: 'Technical Sales' },
        { id: 2, skill: 'Digital Marketing' },
        { id: 3, skill: 'Web Development' },
        { id: 4, skill: 'Web Design' },
        { id: 5, skill: 'Data Science' },
        { id: 6, skill: 'Data Analytics' },
        { id: 7, skill: ' Cyber Security' },
        { id: 8, skill: 'Data Analytics' },
        { id: 9, skill: 'A.I. or Machine Learning' },
        { id: 10, skill: 'Something Else' },
        { id: 11, skill: 'I don’t know yet' }
    ];
    }

  ngOnInit() {
    this.countryList = countryStatesList.countrysStateName;
    this.getProfile();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'skill',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
  };

  }

  getProfile() {

      this.dataService.getProfileDetail().subscribe(
        (res: any) => {
          if (res.status === true) {
            if (res.data.program) {
              this.program = 'yes';
              this.hideProgram = true;
            } else {
              this.program = 'no';
            }
            this.alreadySelected =  res.data.country;
            this.countryList.forEach(element => {
              if (element.name === this.alreadySelected) {
              this.tempArray.push(element);
            }
         });
            this.tempArray.forEach(element => {
            this.states = element.states;
         });
            this.updateProfileForm.patchValue({
              country: res.data.country,
              state: res.data.state,
              email: res.data.email,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              skill: res.data.study,
              program_value: res.data.program,
              program: this.program,
              living_expenses: res.data.living_expenses === 1 ? true : false,
            });
          } else {
            this.toastr.error(res.message);
          }
        },
        err => {
          this.toastr.error(err.message);
        });
    }

    updateProfile() {
      if (!this.updateProfileForm.valid) {
        // this.isEnable = true;
        this.validateAllFormFields(this.updateProfileForm);
        return;
      } else {
        this.isEnable = false;
        const updateProfile = {
          first_name : this.updateProfileForm.value.first_name,
          last_name : this.updateProfileForm.value.last_name,
          country : this.updateProfileForm.value.country,
          state : this.updateProfileForm.value.state,
          study : this.updateProfileForm.value.skill,
          program : this.updateProfileForm.value.program_value,
          living_expenses : this.updateProfileForm.value.living_expenses,
        };
        this.dataService.updateProfile(updateProfile).subscribe(
          (res: any) => {
          if (res.status === true) {
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
      this.updateProfileForm.value.program_value = null;
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

  uploadProfilePic(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      const fileSize = event.target.files[0].size;
      if (fileSize > 2101546) {
        this.toastr.info(
          'Info!',
          'File size exceeds 2 MB',
          constant.ToastConfig
        );
        return;
      }
    }
    console.log(event, 'eventeventevent');
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.updateProfileForm.patchValue({
          profilePic: reader.result
        });
        // this.editFile = false;
        // this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();
    }
  }

onItemSelect(item: any) {
  console.log('onItemSelect', item);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

}

