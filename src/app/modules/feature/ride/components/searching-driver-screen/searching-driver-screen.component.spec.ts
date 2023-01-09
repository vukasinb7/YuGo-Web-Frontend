import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingDriverScreenComponent } from './searching-driver-screen.component';

describe('SearchingDriverScreenComponent', () => {
  let component: SearchingDriverScreenComponent;
  let fixture: ComponentFixture<SearchingDriverScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchingDriverScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchingDriverScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
