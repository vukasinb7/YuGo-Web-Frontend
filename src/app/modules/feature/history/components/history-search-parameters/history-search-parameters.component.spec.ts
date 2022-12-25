import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySearchParametersComponent } from './history-search-parameters.component';

describe('HistorySearchParametersComponent', () => {
  let component: HistorySearchParametersComponent;
  let fixture: ComponentFixture<HistorySearchParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySearchParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySearchParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
