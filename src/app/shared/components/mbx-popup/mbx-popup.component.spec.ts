import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbxPopupComponent } from './mbx-popup.component';

describe('MbxInfoWindowComponent', () => {
  let component: MbxPopupComponent;
  let fixture: ComponentFixture<MbxPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbxPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
