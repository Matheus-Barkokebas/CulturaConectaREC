import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTipoItensComponent } from './new-tipo-itens.component';

describe('NewTipoItensComponent', () => {
  let component: NewTipoItensComponent;
  let fixture: ComponentFixture<NewTipoItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTipoItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTipoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
