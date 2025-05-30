import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  signal,
  computed,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Evento } from '../evento/evento.model';
import { IEventoService } from '../services/api/evento/ievento.service';
import { SERVICES_TOKEN } from '../services/service.token';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventoService } from '../services/api/evento/evento.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DescricaoDialogComponent } from '../descricao-dialog/descricao-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';

interface CalendarDay {
  value: Date | null;
  display: string;
  hasCultura: boolean;
  hasTurismo: boolean;
  hasBoth: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    DatePipe
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioComponent {
  private readonly eventoService = inject<IEventoService>(SERVICES_TOKEN.HTTP.EVENTO);

  selected = signal<Date | null>(null);
  currentDate = signal<Date>(new Date());
  eventosDoDia = signal<Evento[]>([]);
  eventosPorData = signal<{[key: string]: {eventos: Evento[], cultura: number, turismo: number}}>({});

  pageSize = signal(2);
  pageIndex = signal(0);

  weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  weekDaysShort = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  @Output() onConfirmDelete = new EventEmitter<Evento>();
  @Output() onRequestUpdate = new EventEmitter<Evento>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.carregarEventos();
  }

  currentMonth = computed(() => {
    return this.currentDate().toLocaleString('default', { month: 'long' });
  });

  currentYear = computed(() => {
    return this.currentDate().getFullYear();
  });

  calendarDays = computed(() => {
    const year = this.currentDate().getFullYear();
    const month = this.currentDate().getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        value: null,
        display: '',
        hasCultura: false,
        hasTurismo: false,
        hasBoth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const eventosData = this.eventosPorData()[dateStr];

      days.push({
        value: date,
        display: i.toString(),
        hasCultura: eventosData?.cultura > 0,
        hasTurismo: eventosData?.turismo > 0,
        hasBoth: eventosData?.cultura > 0 && eventosData?.turismo > 0
      });
    }

    return days;
  });

  dateClass = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const eventosData = this.eventosPorData()[dateStr];

    if (!eventosData) return '';

    if (eventosData.cultura > 0 && eventosData.turismo > 0) {
      return 'has-both-events';
    } else if (eventosData.cultura > 0) {
      return 'has-cultura-events';
    } else if (eventosData.turismo > 0) {
      return 'has-turismo-events';
    }
    return '';
  };

  carregarEventos() {
    this.eventoService.list().subscribe({
      next: (eventos: Evento[]) => {
        const eventosPorData: {[key: string]: {eventos: Evento[], cultura: number, turismo: number}} = {};

        eventos.forEach(evento => {
          if (evento.periodo?.dataInicio) {
            let dataStr: string;

            if (typeof evento.periodo.dataInicio === 'string') {
              dataStr = new Date(evento.periodo.dataInicio).toISOString().slice(0, 10);
            }
            else if (evento.periodo.dataInicio instanceof Date) {
              dataStr = evento.periodo.dataInicio.toISOString().slice(0, 10);
            } else {
              return;
            }

            if (!eventosPorData[dataStr]) {
              eventosPorData[dataStr] = {eventos: [], cultura: 0, turismo: 0};
            }

            eventosPorData[dataStr].eventos.push(evento);

            const secretaria = evento.secretariaResponsavel?.nome?.toLowerCase() || '';
            if (secretaria.includes('cultura')) {
              eventosPorData[dataStr].cultura++;
            } else if (secretaria.includes('turismo')) {
              eventosPorData[dataStr].turismo++;
            }
          }
        });

        this.eventosPorData.set(eventosPorData);
      },
      error: (err) => {
        console.error('Erro ao buscar eventos:', err);
      }
    });
  }

  eventosPaginados = () => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.eventosDoDia().slice(start, end);
  };

  selectDay(date: Date | null) {
    if (!date) return;

    this.selected.set(date);
    this.pageIndex.set(0);

    const dataFormatada = date.toISOString().split('T')[0];
    const eventosData = this.eventosPorData()[dataFormatada];

    if (eventosData) {
      this.eventosDoDia.set(eventosData.eventos);
    } else {
      this.eventosDoDia.set([]);
    }
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selected()) return false;
    return date.toDateString() === this.selected()!.toDateString();
  }

  changeMonth(offset: number) {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() + offset);
    this.currentDate.set(newDate);
  }

  getEventosInfo(date: Date): string {
    const dateStr = date.toISOString().split('T')[0];
    const eventosData = this.eventosPorData()[dateStr];

    if (!eventosData) return '';

    if (eventosData.cultura > 0 && eventosData.turismo > 0) {
      return `Total: ${eventosData.eventos.length} eventos (Cultura: ${eventosData.cultura}, Turismo: ${eventosData.turismo})`;
    } else if (eventosData.cultura > 0) {
      return `${eventosData.eventos.length} eventos da Cultura`;
    } else if (eventosData.turismo > 0) {
      return `${eventosData.eventos.length} eventos do Turismo`;
    }
    return '';
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  abrirDescricao(evento: Evento): void {
    this.dialog.open(DescricaoDialogComponent, {
      data: {
        evento,
        onUpdate: () => this.update(evento),
        onDelete: () => this.delete(evento),
      },
      width: '400px',
    });
  }

  update(evento: Evento): void {
    this.onRequestUpdate.emit(evento);
  }

  delete(evento: Evento): void {
    this.dialog
      .open(YesNoDialogComponent, {
        data: {
          title: 'Exclusão do evento',
          content: `Confirma a exclusão do evento ${evento.infoBasicas.nome}?`,
        },
        width: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(evento);
        }
      });
  }
}
