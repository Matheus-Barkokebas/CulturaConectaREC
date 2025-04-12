import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Evento } from '../../evento.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evento-table',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  templateUrl: './evento-table.component.html',
  styleUrl: './evento-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class EventoTableComponent implements OnChanges, OnDestroy {
  @Input() eventos: Evento[] = [];
  paginatedEventos: Evento[] = [];

  @Output() onConfirmDelete = new EventEmitter<Evento>();
  @Output() onRequestUpdate = new EventEmitter<Evento>();

  private dialogManagerServiceSubscriptions?: Subscription;

  pageSize = 6;
  currentPage = 0;
  totalPages = 1;

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventos']) {
      this.currentPage = 0;
      this.updatePaginatedData();
    }
  }

  ngOnDestroy(): void {
    this.dialogManagerServiceSubscriptions?.unsubscribe();
  }

  update(evento: Evento) {
    this.onRequestUpdate.emit(evento);
  }

  delete(evento: Evento) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do evento',
        content: `Confirma a exclusão do evento ${evento.nome}?`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(evento);
          this.eventos = this.eventos.filter((e) => e.id !== evento.id);
          this.currentPage = 0;
          this.updatePaginatedData();
        }
      });
  }

  updatePaginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEventos = this.eventos.slice(start, end);
    this.totalPages = Math.ceil(this.eventos.length / this.pageSize) || 1;
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }
}
