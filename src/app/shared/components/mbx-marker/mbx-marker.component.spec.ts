import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbxMarkerComponent } from './mbx-marker.component';

describe('MbxMarkerComponent', () => {
  let component: MbxMarkerComponent;
  let fixture: ComponentFixture<MbxMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbxMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbxMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
