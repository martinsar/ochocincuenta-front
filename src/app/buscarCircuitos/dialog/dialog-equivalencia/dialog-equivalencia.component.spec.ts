import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEquivalenciaComponent } from './dialog-equivalencia.component';

describe('DialogEquivalenciaComponent', () => {
  let component: DialogEquivalenciaComponent;
  let fixture: ComponentFixture<DialogEquivalenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEquivalenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEquivalenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
