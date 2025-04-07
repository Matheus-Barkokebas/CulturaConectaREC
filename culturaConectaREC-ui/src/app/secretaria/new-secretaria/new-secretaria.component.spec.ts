import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSecretariaComponent } from './new-secretaria.component';

describe('NewSecretariaComponent', () => {
  let component: NewSecretariaComponent;
  let fixture: ComponentFixture<NewSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
