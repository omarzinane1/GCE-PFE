import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JschequeComponent } from './jscheque.component';

describe('JschequeComponent', () => {
  let component: JschequeComponent;
  let fixture: ComponentFixture<JschequeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JschequeComponent]
    });
    fixture = TestBed.createComponent(JschequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
