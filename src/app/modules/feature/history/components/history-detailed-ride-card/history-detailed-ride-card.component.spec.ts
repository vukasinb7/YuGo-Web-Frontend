import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDetailedRideCardComponent } from './history-detailed-ride-card.component';

describe('HistoryDetailedRideCardComponent', () => {
  let component: HistoryDetailedRideCardComponent;
  let fixture: ComponentFixture<HistoryDetailedRideCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryDetailedRideCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryDetailedRideCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
