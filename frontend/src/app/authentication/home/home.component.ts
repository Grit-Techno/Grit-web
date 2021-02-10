import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorList } from '../../shared/services/validator.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  ContactUsForm: FormGroup;
  public account_validation_messages = ValidatorList.account_validation_messages;
  title = 'OwlCarousel2 in Angular7 with Custom Navigation Arrows';

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: ['<div class=\'nav-btn prev-slide\'></div>', '<div class=\'nav-btn next-slide\'></div>'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 2,
        nav: true,
        loop: false
      },
    }
  };

  images = [
    {
      text: 'Kyler Gordan',
      image: '../../../assets/photo00.jpeg',
      Goal: '$20,000',
      Raised: '$16,000',
      RoGo: '$4,000',
      percent: '80',
      role: 'Cyber Security'
    },
    {
      text: 'Cori Garnett',
      image: '../../../assets/depositphotos_32004151-stock-photo-cheerful-young-african-woman-smiling.jpg',
      Goal: '$10,000',
      Raised: '$7,000',
      RoGo: '$3,000',
      percent: '70',
      role: 'Full Stack'
    },
    {
      text: 'Ronald Taylor',
      image: '../../../assets/istockphoto-1007763808-612x612.jpg',
      Goal: '$5,000',
      Raised: '$35,00',
      RoGo: '$15,00',
      percent: '70',
      role: 'Technical Sales'
    },
  ];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {
    this.ContactUsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
   }

  ngOnInit() {
    // let urlParams = [];
    // window.location.search.replace('?', '').split('&').forEach(function (e, i) {
    //     const p = e.split('=');
    //     urlParams[p[0]] = p[1];
    // });

    // We have all the params now -> you can access it by name
    // console.log(urlParams['loaded']);

    // if (urlParams['loaded']) {}else{

    //     const win = (window as any);
    //     win.location.search = '?loaded=1';
    //     //win.location.reload('?loaded=1');
    // }
  }

  // ngAfterContentInit(): void {
  //   alert('4. after content init called');
  //   }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  contactUs() {
    if (this.ContactUsForm.valid) {
      const credentials = {
        name: this.ContactUsForm.value.first_name,
        last_name: this.ContactUsForm.value.last_name,
        email: this.ContactUsForm.value.email,
        password: this.ContactUsForm.value.password,
      };
      // this.userService.registerUser(credentials).subscribe(
      //   (res: any) => {
      //     if (res.status === true) {
      //       this.jwtService.saveUser(res.data);
      //       this.toastr.success(res.message);
      //     } else {
      //       this.toastr.error(res.message);
      //     }
      //   },
      //   err => {
      //     this.toastr.error(err.message);
      //   });
    } else {
      this.validateAllFormFields(this.ContactUsForm);
      return;
    }
  }

}
