import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElectionComponent } from './update-election.component';

describe('UpdateElectionComponent', () => {
  let component: UpdateElectionComponent;
  let fixture: ComponentFixture<UpdateElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateElectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
