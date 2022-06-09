import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearCalleComponent } from './dialog-crear-calle.component';

describe('DialogCrearCalleComponent', () => {
  let component: DialogCrearCalleComponent;
  let fixture: ComponentFixture<DialogCrearCalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrearCalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCrearCalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
