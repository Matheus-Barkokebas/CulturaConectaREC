import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItensTableComponent } from './tipo-itens-table.component';

describe('TipoItensTableComponent', () => {
  let component: TipoItensTableComponent;
  let fixture: ComponentFixture<TipoItensTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoItensTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoItensTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
