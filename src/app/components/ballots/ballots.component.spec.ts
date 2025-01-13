import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotsComponent } from './ballots.component';

describe('BallotsComponent', () => {
  let component: BallotsComponent;
  let fixture: ComponentFixture<BallotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
