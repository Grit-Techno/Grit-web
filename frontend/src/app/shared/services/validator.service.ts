import { Component, OnInit } from '@angular/core';
export class ValidatorList {
  // tslint:disable-next-line:variable-name
  static account_validation_messages: any = {
    email: [
      { type: 'required', message: '* Field Required.' },
      { type: 'pattern', message: '* Enter a valid email.' },
      { type: 'emailValidator', message: '* Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: '* Field Required.' },
      {
        type: 'minlength',
        message: '* Password must be at least 6 characters long.'
      },
      { type: 'pattern', message: '* Password must be alpha-numeric.' },
      { type: 'nameValidator', message: '* Enter a valid password.' },
       { type: 'nameValidator', message: '* Enter a valid password.' }
    ],
    newPassword: [
      { type: 'required', message: '* Field Required.' },
    ],
    message: [
      { type: 'required', message: '* Message can not be blank.' },
    ],
    score_value: [
      { type: 'required', message: '* This field is required.' },
    ],
    oldPassword: [
      { type: 'required', message: '* Old Password is required.' },
    ],
    first_name: [
      { type: 'required', message: '* Field Required.' },
      { type: 'minlength', message: '* First Name atleast 3 character long.' },
      { type: 'maxlength', message: '* First Name can only have 16 character.' },
      {
        type: 'numberNotRequiredValidator',
        message: '* First Name should not contain numbers.'
      },
      { type: 'pattern', message: '* First Name should contain alphabets only.' },
      {
        type: 'avoidEmptyStrigs',
        message: '* First Name should not be empty string.'
      },
      { type: 'nameValidator', message: '* Enter a valid name.' }
    ],
    last_name: [
      { type: 'required', message: '* Field Required.' },
      { type: 'pattern', message: '* Last Name should contain alphabets only.' },
      { type: 'minlength', message: '* Last Name atleast 3 character long.' },
      { type: 'maxlength', message: '* Last Name can only have 16 character.' },
      {
        type: 'numberNotRequiredValidator',
        message: '* Last Name should not contain numbers.'
      },
      {
        type: 'avoidEmptyStrigs',
        message: '* Last Name should not be empty string.'
      },
      { type: 'nameValidator', message: '* Enter a valid name.' }
    ],
    country: [
      { type: 'required', message: '* Field Required.' }
    ],
    name: [
      { type: 'required', message: '* Field Required.' }
    ],
    selected_type: [
      { type: 'required', message: '*  Please select a type.' }
    ],
    cpassword: [
      {
        type: 'required',
        message: '* Confirm password is required.'
      }
    ],
    phone: [
      {type: 'required', message: '* Field Required.'},
      { type: 'minlength', message: '* phone number atleast 10 numbers long.' },
      { type: 'maxlength', message: '* phone number can only have 10 numbers.' },
    ],
    location: [{type: 'required', message: '* Field Required.'}],
    state: [{type: 'required', message: '* Field Required.'}],
    study: [{type: 'required', message: '* Field Required.'}],
    role: [{ type: 'required', message: '* Field Required.' }],
    program: [{ type: 'required', message: '* Field Required.' }],
    program_value: [{ type: 'required', message: '* Field Required.' }],
    living_expenses: [{ type: 'required', message: '* Field Required.' }],
  };
  // tslint:disable-next-line:variable-name
  static numberNotRequiredValidator(number): any {
    if (number.pristine) {
      return null;
    }
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;

    number.markAsTouched();

    const value = number.value.trim();

    if (NUMBER_REGEXP.test(value)) {
      return {
        numberNotRequiredValidator: true
      };
    }

    return null;
  }

  // tslint:disable-next-line:variable-name
  static percentValidation(number): any {
    if (number.pristine) {
      return null;
    }
    number.markAsTouched();
    // tslint:disable-next-line: radix
    const temp_number = parseInt(number.value);
    if (temp_number > 100 || temp_number < 0) {
      return {
        percentValidation: true
      };
    } else {
      return null;
    }
  }

  static avoidEmptyStrigs(value): any {
    if (value.pristine) {
      return null;
    }

    value.markAsTouched();

    if (value.value.trim() === '' && value.value.length > 0) {
      return {
        avoidEmptyStrigs: true
      };
    }

    return null;
  }

  static emailValidator(value): any {
    if (value.pristine) {
      return null;
    }

    if (value.value.length === 0) {
      return;
    }

    const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    value.markAsTouched();

    if (EMAIL_REGEXP.test(value.value)) {
      return null;
    }

    return {
      emailValidator: true
    };
  }

  static nameValidator(value): any {
    if (value.pristine) {
      return null;
    }

    if (value.value.length === 0) {
      return;
    }

    const EMAIL_REGEXP = /^[^\s]+$/;

    value.markAsTouched();

    if (EMAIL_REGEXP.test(value.value)) {
      return null;
    }

    return {
      namelValidator: true
    };
  }
}
