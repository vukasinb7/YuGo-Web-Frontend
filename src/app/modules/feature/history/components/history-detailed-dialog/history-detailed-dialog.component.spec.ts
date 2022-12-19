import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDetailedDialogComponent } from './history-detailed-dialog.component';

describe('HistoryDetailedDialogComponent', () => {
  let component: HistoryDetailedDialogComponent;
  let fixture: ComponentFixture<HistoryDetailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryDetailedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryDetailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
