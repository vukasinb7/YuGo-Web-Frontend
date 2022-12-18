import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryReviewCardDriverComponent } from './history-review-card-driver.component';

describe('HistoryReviewCardDriverComponent', () => {
  let component: HistoryReviewCardDriverComponent;
  let fixture: ComponentFixture<HistoryReviewCardDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryReviewCardDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryReviewCardDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
