import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoTableComponent } from './evento-table.component';

describe('EventoTableComponent', () => {
  let component: EventoTableComponent;
  let fixture: ComponentFixture<EventoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
