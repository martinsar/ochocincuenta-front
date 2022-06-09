import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarTramoComponent } from './dialog-modificar-tramo.component';

describe('DialogModificarTramoComponent', () => {
  let component: DialogModificarTramoComponent;
  let fixture: ComponentFixture<DialogModificarTramoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarTramoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarTramoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
