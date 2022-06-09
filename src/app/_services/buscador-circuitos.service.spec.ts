import { TestBed } from '@angular/core/testing';

import { BuscadorCircuitosService } from './buscador-circuitos.service';

describe('BuscadorCircuitosService', () => {
  let service: BuscadorCircuitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorCircuitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
