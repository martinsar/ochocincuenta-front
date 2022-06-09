import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePartidosComponent } from './autocomplete-partidos.component';

describe('AutocompletePartidosComponent', () => {
  let component: AutocompletePartidosComponent;
  let fixture: ComponentFixture<AutocompletePartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompletePartidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
