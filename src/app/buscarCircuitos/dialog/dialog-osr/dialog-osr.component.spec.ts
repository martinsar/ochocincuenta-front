import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOsrComponent } from './dialog-osr.component';

describe('DialogOsrComponent', () => {
  let component: DialogOsrComponent;
  let fixture: ComponentFixture<DialogOsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
