import {NgModule} from '@angular/core';
import {
    MatSlideToggleModule, MatDialogModule , MatRadioModule , MatInputModule, MatIconModule, MatButtonModule, MatSelectModule,
    MatExpansionModule, MatChipsModule, MatProgressSpinnerModule, MatPaginatorModule, MatTooltipModule,
     MatCheckboxModule, MatStepperModule, MatTabsModule, MatFormFieldModule
} from '@angular/material';

@NgModule({
  exports: [
    MatSlideToggleModule, MatDialogModule, MatRadioModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule,
    MatExpansionModule, MatChipsModule, MatProgressSpinnerModule, MatPaginatorModule, MatTooltipModule,
    MatCheckboxModule, MatStepperModule, MatTabsModule , MatFormFieldModule, MatInputModule, MatIconModule
  ]
})
export class MaterialListModule {}
