import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCodigosPostalesComponent } from './dialog-codigos-postales.component';

describe('DialogCodigosPostalesComponent', () => {
  let component: DialogCodigosPostalesComponent;
  let fixture: ComponentFixture<DialogCodigosPostalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCodigosPostalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCodigosPostalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
