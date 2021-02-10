import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  StripeService,
  StripeCardComponent
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  cardToken: any;
  // tslint:disable-next-line:no-inferrable-types
  stripeCardValid: boolean = false;
  @ViewChild(StripeCardComponent, {static: true}) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  get validForm() {
    return this.paymentForm.valid && this.stripeCardValid;
  }

  elementsOptions: StripeElementsOptions  = {
    locale: 'en'
  };
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router,

  ) { }
  ngOnInit() {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  onChange({ type, event }) {
    if (type === 'change') {
      this.stripeCardValid = event.complete;
    }
  }
  buy() {
    console.log(this.paymentForm.valid);
    this.stripeService
      .createToken(this.card.getCard(), { name: this.paymentForm.value.name })
      .subscribe(result => {
        if (result.token) {
          this.cardToken  = result.token;
          this.makePayment();
          this.toastr.info('please wait while your transaction is completed, do not press back button or refresh page.');
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }


  makePayment() {
      this.dataService.makePayment({
        amount: 10,
        card_token: this.cardToken,
        name: this.paymentForm.value.name
      }).subscribe(
        (res: any) => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.router.navigate(['/donate-now']);
        } else {
          this.toastr.error(res.message);
        }
      },
      err => {
        this.toastr.error(err.message);
      });
}

}
