import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared';

@Component({
  selector: 'app-cust-loader',
  templateUrl: './cust-loader.component.html',
  styleUrls: ['./cust-loader.component.css']
})
export class CustLoaderComponent implements OnInit {

  loading: boolean;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor(public loaderService: LoaderService) {
  }

  ngOnInit() {
  }

}
