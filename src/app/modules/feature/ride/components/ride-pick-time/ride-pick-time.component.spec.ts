import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePickTimeComponent } from './ride-pick-time.component';

describe('RidePickTimeComponent', () => {
  let component: RidePickTimeComponent;
  let fixture: ComponentFixture<RidePickTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidePickTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePickTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
