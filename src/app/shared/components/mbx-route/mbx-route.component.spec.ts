import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbxRouteComponent } from './mbx-route.component';

describe('MbxRouteComponent', () => {
  let component: MbxRouteComponent;
  let fixture: ComponentFixture<MbxRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbxRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbxRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
