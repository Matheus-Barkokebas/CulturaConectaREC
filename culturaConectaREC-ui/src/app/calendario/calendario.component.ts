import { ChangeDetectionStrategy, Component, inject, model, OnDestroy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Evento } from '../evento/evento.model';
import { IEventoService } from '../services/api/evento/ievento.service';
import { SERVICES_TOKEN } from '../services/service.token';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventoService } from '../services/api/evento/evento.service';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatIconModule],
  providers: [provideNativeDateAdapter(),
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioComponent {
  private readonly eventoService = inject<IEventoService>(SERVICES_TOKEN.HTTP.EVENTO);

  selected = signal<Date | null>(null);
  eventosDoDia = signal<Evento[]>([]);

  onDateSelected(date: Date | null) {
    this.selected.set(date);

    if (date) {
      const dataFormatada = date.toISOString().split('T')[0];
      this.eventoService.list().subscribe((eventos: any[]) => {
        const filtrados = eventos.filter((e: { dataInicio: string; }) => e.dataInicio.startsWith(dataFormatada));
        this.eventosDoDia.set(filtrados);
      });
    }
  }
}
