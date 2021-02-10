import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInvesterComponent } from './register-invester.component';

describe('RegisterInvesterComponent', () => {
  let component: RegisterInvesterComponent;
  let fixture: ComponentFixture<RegisterInvesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInvesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInvesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
