import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SJCChequeComponent } from './sjccheque.component';

describe('SJCChequeComponent', () => {
  let component: SJCChequeComponent;
  let fixture: ComponentFixture<SJCChequeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SJCChequeComponent]
    });
    fixture = TestBed.createComponent(SJCChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
