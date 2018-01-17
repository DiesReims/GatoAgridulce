import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasDetalleComponent } from './recetas-detalle.component';

describe('RecetasDetalleComponent', () => {
  let component: RecetasDetalleComponent;
  let fixture: ComponentFixture<RecetasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
