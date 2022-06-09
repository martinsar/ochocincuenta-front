import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCircuitosComponent } from './buscador-circuitos.component';

describe('BuscadorCircuitosComponent', () => {
  let component: BuscadorCircuitosComponent;
  let fixture: ComponentFixture<BuscadorCircuitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorCircuitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCircuitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
