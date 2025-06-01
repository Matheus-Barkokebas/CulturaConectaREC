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
  standalone: true,
  imports: [EventoFormComponent],
  templateUrl: './edit-evento.component.html',
  styleUrls: ['./edit-evento.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditEventoComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  evento: Evento = {
    id: 0,
    infoBasicas: {
      nome: '',
      descricao: '',
      status: '',
    },
    periodo: {
      dataInicio: new Date(),
      dataFim: new Date(),
      horarioInicio: '',
      horarioFim: '',
    },
    endereco: {
      espacoPublico: '',
      tipoEspaco: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      pontoReferencia: '',
      linkGoogleMaps: '',
    },
    detalhes: {
      periodicidade: '',
      categoria: '',
      capacidade: 0,
      espacoCoberto: false,
      acessivel: false,
      estacionamento: false,
      possuiBanheiros: false,
      wifiDisponivel: false,
      equipamentosFornecidos: '',
    },
    links: {
      linkSiteOficial: '',
      linkMapa: '',
    },
    contatosEvento: {
      contatosEvento: '',
    },
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
      this.snackBarManager.show('Erro ao recuperar informações do evento');
      this.router.navigate(['list/evento']);
      return;
    }
    this.httpsubscriptions.push(
      this.httpService.findByID(Number(id)).subscribe({
        next: (data) => (this.evento = data),
        error: () => {
          this.snackBarManager.show('Erro ao buscar o evento');
          this.router.navigate(['list/evento']);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: Evento) {
    if (this.evento.id) {
      this.httpsubscriptions.push(
        this.httpService.update(this.evento.id, value).subscribe({
          next: () => {
            this.snackBarManager.show('Evento atualizado com sucesso');
            this.router.navigate(['list/evento']);
          },
          error: () => {
            this.snackBarManager.show('Erro ao atualizar o evento');
          },
        })
      );
    } else {
      this.snackBarManager.show('Um erro inesperado aconteceu');
      this.router.navigate(['list/evento']);
    }
  }
}
