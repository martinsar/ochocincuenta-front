import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCruceComponent } from './dialog-cruce.component';

describe('DialogCruceComponent', () => {
  let component: DialogCruceComponent;
  let fixture: ComponentFixture<DialogCruceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCruceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCruceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
