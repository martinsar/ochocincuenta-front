import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLocalidadesComponent } from './dialog-localidades.component';

describe('DialogLocalidadesComponent', () => {
  let component: DialogLocalidadesComponent;
  let fixture: ComponentFixture<DialogLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLocalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
