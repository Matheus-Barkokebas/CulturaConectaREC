import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaFormComponent } from './secretaria-form.component';

describe('SecretariaFormComponent', () => {
  let component: SecretariaFormComponent;
  let fixture: ComponentFixture<SecretariaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretariaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
