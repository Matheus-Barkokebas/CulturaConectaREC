import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItensFormComponent } from './tipo-itens-form.component';

describe('TipoItensFormComponent', () => {
  let component: TipoItensFormComponent;
  let fixture: ComponentFixture<TipoItensFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoItensFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoItensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
