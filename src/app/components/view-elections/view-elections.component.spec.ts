import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewElectionsComponent } from './view-elections.component';

describe('ViewElectionsComponent', () => {
  let component: ViewElectionsComponent;
  let fixture: ComponentFixture<ViewElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewElectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
