import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaTableComponent } from './secretaria-table.component';

describe('SecretariaTableComponent', () => {
  let component: SecretariaTableComponent;
  let fixture: ComponentFixture<SecretariaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretariaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretariaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
