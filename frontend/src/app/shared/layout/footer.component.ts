import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./layout.component.css']
})
export class FooterComponent {
  public year = new Date().getFullYear();
  today: number = Date.now();
}
