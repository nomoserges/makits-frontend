import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstsetupComponent } from './firstsetup.component';

describe('FirstsetupComponent', () => {
  let component: FirstsetupComponent;
  let fixture: ComponentFixture<FirstsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
