import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Evento } from '../evento.model';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { EventoService } from '../../services/api/evento/evento.service';
import { EventoFormComponent } from '../components/evento-form/evento-form.component';
import { IEventoService } from '../../services/api/evento/ievento.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-evento',
  imports: [EventoFormComponent],
  templateUrl: './edit-evento.component.html',
  styleUrl: './edit-evento.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditEventoComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  evento: Evento = {
    id: 0,
    nome: '',
    descricao: '',
    dataInicio: new Date(''),
    dataFim: new Date(''),
    localizacao: '',
    tipo: '',
    status: '',
    secretariaResponsavel: {
      id: 0,
      nome: '',
    },
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.EVENTO)
    private readonly httpService: IEventoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informacoes do evento');
      this.router.navigate(['list/evento']);
      return;
    }
    this.httpsubscriptions?.push(
      this.httpService
        .findByID(Number(id))
        .subscribe((data) => (this.evento = data))
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: Evento) {
    if (value.id) {
      this.httpsubscriptions?.push(
        this.httpService.update(value.id, value).subscribe((_) => {
          this.snackBarManager.show('Evento autalizado com sucesso');
          this.router.navigate(['list/evento']);
        })
      );
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['list/evento']);
  }
}
