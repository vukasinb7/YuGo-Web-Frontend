import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMapCardComponent } from './history-map-card.component';

describe('HistoryMapCardComponent', () => {
  let component: HistoryMapCardComponent;
  let fixture: ComponentFixture<HistoryMapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryMapCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryMapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
