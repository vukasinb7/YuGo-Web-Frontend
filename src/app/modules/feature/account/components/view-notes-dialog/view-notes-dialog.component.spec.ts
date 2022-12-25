import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotesDialogComponent } from './view-notes-dialog.component';

describe('ViewNotesDialogComponent', () => {
  let component: ViewNotesDialogComponent;
  let fixture: ComponentFixture<ViewNotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNotesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
