import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoItensComponent } from './list-tipo-itens.component';

describe('ListTipoItensComponent', () => {
  let component: ListTipoItensComponent;
  let fixture: ComponentFixture<ListTipoItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTipoItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTipoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
