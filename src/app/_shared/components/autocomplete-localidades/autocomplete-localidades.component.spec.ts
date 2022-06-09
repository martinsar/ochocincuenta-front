import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteLocalidadesComponent } from './autocomplete-localidades.component';

describe('AutocompleteLocalidadesComponent', () => {
  let component: AutocompleteLocalidadesComponent;
  let fixture: ComponentFixture<AutocompleteLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteLocalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
