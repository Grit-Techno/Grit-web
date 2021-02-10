import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustLoaderComponent } from './cust-loader/cust-loader.component';
import { MaterialListModule } from '../material.module';

@NgModule({
  declarations: [CustLoaderComponent],
  imports: [
    CommonModule, MaterialListModule
  ], exports : [CustLoaderComponent]
})
export class LoaderModule { }
