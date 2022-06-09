import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCalleComponent } from './alta-calle.component';

describe('AltaCalleComponent', () => {
  let component: AltaCalleComponent;
  let fixture: ComponentFixture<AltaCalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaCalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
