import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoItensComponent } from './edit-tipo-itens.component';

describe('EditTipoItensComponent', () => {
  let component: EditTipoItensComponent;
  let fixture: ComponentFixture<EditTipoItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTipoItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTipoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
