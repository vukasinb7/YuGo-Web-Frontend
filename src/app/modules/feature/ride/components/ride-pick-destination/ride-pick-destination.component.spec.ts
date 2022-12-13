import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePickDestinationComponent } from './ride-pick-destination.component';

describe('RidePickDestinationComponent', () => {
  let component: RidePickDestinationComponent;
  let fixture: ComponentFixture<RidePickDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidePickDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePickDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
