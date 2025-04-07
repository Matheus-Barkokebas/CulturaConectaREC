import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecretariaComponent } from './list-secretaria.component';

describe('ListSecretariaComponent', () => {
  let component: ListSecretariaComponent;
  let fixture: ComponentFixture<ListSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
