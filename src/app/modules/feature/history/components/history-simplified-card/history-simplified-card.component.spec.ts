import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySimplifiedCardComponent } from './history-simplified-card.component';

describe('HistorySimplifiedCardComponent', () => {
  let component: HistorySimplifiedCardComponent;
  let fixture: ComponentFixture<HistorySimplifiedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySimplifiedCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySimplifiedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
