import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMarkerComponent } from './dialog-marker.component';

describe('DialogMarkerComponent', () => {
  let component: DialogMarkerComponent;
  let fixture: ComponentFixture<DialogMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
