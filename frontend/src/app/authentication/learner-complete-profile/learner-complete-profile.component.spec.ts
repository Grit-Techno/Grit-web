import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerCompleteProfileComponent } from './learner-complete-profile.component';

describe('LearnerCompleteProfileComponent', () => {
  let component: LearnerCompleteProfileComponent;
  let fixture: ComponentFixture<LearnerCompleteProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerCompleteProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerCompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
