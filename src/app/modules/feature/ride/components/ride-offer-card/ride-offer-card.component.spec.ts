import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideOfferCardComponent } from './ride-offer-card.component';

describe('RideOfferCardComponent', () => {
  let component: RideOfferCardComponent;
  let fixture: ComponentFixture<RideOfferCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideOfferCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
