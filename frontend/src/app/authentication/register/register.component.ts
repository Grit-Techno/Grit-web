import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private matDialog: MatDialog,
    private router: Router,
    public toastr: ToastrService) { }

  ngOnInit() {
  }

  submitForm(addressInfo, basicInfo) {

  }
}
