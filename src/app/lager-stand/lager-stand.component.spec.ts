import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LagerStandComponent } from './lager-stand.component';

describe('LagerStandComponent', () => {
  let component: LagerStandComponent;
  let fixture: ComponentFixture<LagerStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LagerStandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LagerStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
