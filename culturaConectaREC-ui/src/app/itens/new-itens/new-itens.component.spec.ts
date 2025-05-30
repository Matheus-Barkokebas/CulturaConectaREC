import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItensComponent } from './new-itens.component';

describe('NewItensComponent', () => {
  let component: NewItensComponent;
  let fixture: ComponentFixture<NewItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
