import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItensComponent } from './tipo-itens.component';

describe('TipoItensComponent', () => {
  let component: TipoItensComponent;
  let fixture: ComponentFixture<TipoItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
