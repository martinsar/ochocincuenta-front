import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepartamentosComponent } from './dialog-departamentos.component';

describe('DialogDepartamentosComponent', () => {
  let component: DialogDepartamentosComponent;
  let fixture: ComponentFixture<DialogDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDepartamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
