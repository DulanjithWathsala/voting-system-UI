import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElectionAdminsComponent } from './manage-election-admins.component';

describe('ManageElectionAdminsComponent', () => {
  let component: ManageElectionAdminsComponent;
  let fixture: ComponentFixture<ManageElectionAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageElectionAdminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageElectionAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
