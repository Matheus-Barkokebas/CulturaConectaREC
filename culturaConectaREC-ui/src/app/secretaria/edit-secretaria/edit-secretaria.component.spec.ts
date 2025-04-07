import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecretariaComponent } from './edit-secretaria.component';

describe('EditSecretariaComponent', () => {
  let component: EditSecretariaComponent;
  let fixture: ComponentFixture<EditSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
