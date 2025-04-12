import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Evento } from '../evento.model';
import { SERVICES_TOKEN } from '../../services/service.token';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { IEventoService } from '../../services/api/evento/ievento.service';
import { EventoTableComponent } from '../components/evento-table/evento-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EventoService } from '../../services/api/evento/evento.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-list-evento',
  imports: [EventoTableComponent, MatTabsModule],
  templateUrl: './list-evento.component.html',
  styleUrl: './list-evento.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListEventoComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  evento: Evento[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.EVENTO)
    private readonly httpService: IEventoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.evento = data))
    );
  }
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(evento: Evento) {
    this.router.navigate(['edit/evento', evento.id]);
  }

  delete(evento: Evento) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(evento.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O evento ${evento.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
