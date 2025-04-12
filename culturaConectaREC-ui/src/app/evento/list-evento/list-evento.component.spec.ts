import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventoComponent } from './list-evento.component';

describe('ListEventoComponent', () => {
  let component: ListEventoComponent;
  let fixture: ComponentFixture<ListEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
