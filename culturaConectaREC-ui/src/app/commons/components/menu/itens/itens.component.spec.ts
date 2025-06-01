import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItensComponent } from './itens.component';

describe('ItensComponent', () => {
  let component: MenuItensComponent;
  let fixture: ComponentFixture<MenuItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
