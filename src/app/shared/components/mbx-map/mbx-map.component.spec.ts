import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbxMapComponent } from './mbx-map.component';

describe('MbxMapComponent', () => {
  let component: MbxMapComponent;
  let fixture: ComponentFixture<MbxMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbxMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbxMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
