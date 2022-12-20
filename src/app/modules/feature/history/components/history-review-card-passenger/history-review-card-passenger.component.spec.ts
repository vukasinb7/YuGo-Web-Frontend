import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryReviewCardPassengerComponent } from './history-review-card-passenger.component';

describe('HistoryReviewCardPassengerComponent', () => {
  let component: HistoryReviewCardPassengerComponent;
  let fixture: ComponentFixture<HistoryReviewCardPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryReviewCardPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryReviewCardPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
