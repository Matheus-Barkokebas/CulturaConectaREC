import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SERVICES_TOKEN } from '../../../services/service.token';
import { EventoService } from '../../../services/api/evento/evento.service';
import { SecretariaService } from '../../../services/api/secretaria/secretaria.service';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';

import { Secretaria } from '../../../secretaria/secretaria.models';
import { ISecretariaService } from '../../../services/api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { Evento } from '../../evento.model';
import { Itens } from '../../../itens/itens.model';
import { ItensService } from '../../../services/api/itens/itens.service';
import { IItensService } from '../../../services/api/itens/iitens.service';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
    { provide: SERVICES_TOKEN.HTTP.ITENS, useClass: ItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class EventoFormComponent implements OnInit, OnDestroy, OnChanges  {
  form: FormGroup;
  secretarias: Secretaria[] = [];
  itens: Itens[] = [];
  private httpSubscriptions: Subscription[] = [];
  isLoadingCep = false;

  @Input() evento: Evento = {
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
      equipamentosFornecidos: ''
    },
    links: {
      linkSiteOficial: '',
      linkMapa: '',
    },
    secretariaResponsavel: {
      id: 0,
      nome: '',
    },
  };

  @Output() eventoSubmited = new EventEmitter<Evento>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpServiceSecretaria: ISecretariaService,
    @Inject(SERVICES_TOKEN.HTTP.ITENS)
    private readonly httpServiceItens: IItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService
  ) {
    this.form = this.fb.group({
      infoBasicas: this.fb.group({
        nome: [this.evento.infoBasicas.nome, Validators.required],
        descricao: [this.evento.infoBasicas.descricao],
        status: [this.evento.infoBasicas.status, Validators.required],
      }),
      periodo: this.fb.group({
        dataInicio: [this.evento.periodo.dataInicio, Validators.required],
        dataFim: [this.evento.periodo.dataFim, Validators.required],
        horarioInicio: [this.evento.periodo.horarioInicio, Validators.required],
        horarioFim: [this.evento.periodo.horarioFim, Validators.required],
      }),
      endereco: this.fb.group({
        espacoPublico: [this.evento.endereco.espacoPublico],
        tipoEspaco: [this.evento.endereco.tipoEspaco],
        cep: [
          this.evento.endereco.cep,
          [Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)],
        ],
        logradouro: [this.evento.endereco.logradouro],
        numero: [this.evento.endereco.numero],
        complemento: [this.evento.endereco.complemento],
        bairro: [this.evento.endereco.bairro],
        cidade: [this.evento.endereco.cidade],
        uf: [this.evento.endereco.uf],
        pontoReferencia: [this.evento.endereco.pontoReferencia],
        linkGoogleMaps: [this.evento.endereco.linkGoogleMaps],
      }),
      detalhes: this.fb.group({
        periodicidade: [this.evento.detalhes.periodicidade],
        categoria: [this.evento.detalhes.categoria],
        capacidade: [this.evento.detalhes.capacidade],
        espacoCoberto: [this.evento.detalhes.espacoCoberto],
        acessivel: [this.evento.detalhes.acessivel],
        estacionamento: [this.evento.detalhes.estacionamento],
        possuiBanheiros: [this.evento.detalhes.possuiBanheiros],
        wifiDisponivel: [this.evento.detalhes.wifiDisponivel],
        equipamentosFornecidos: [
          this.evento.detalhes.equipamentosFornecidos,
        ],
      }),
      links: this.fb.group({
        linkSiteOficial: [this.evento.links.linkSiteOficial],
        linkMapa: [this.evento.links.linkMapa],
      }),
      secretariaResponsavel: this.fb.group({
        id: [this.evento.secretariaResponsavel.id],
      }),
    });
  }

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpServiceSecretaria
        .list()
        .subscribe((data) => (this.secretarias = data))
    );

    this.httpSubscriptions.push(
      this.httpServiceItens.list().subscribe((data) => (this.itens = data))
    );

    if (this.evento) {
      this.form.patchValue(this.evento);
    }
  }

  consultarCEP() {
    const cepControl = this.form.get('endereco.cep');
    let cep = cepControl?.value;

    if (!cep) return;

    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
      this.snackbarManager.show('CEP deve conter 8 dígitos');
      return;
    }

    this.isLoadingCep = true;
    this.httpSubscriptions.push(
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (dados: any) => {
          this.isLoadingCep = false;
          if (!dados.erro) {
            this.preencherEndereco(dados);
          } else {
            this.snackbarManager.show('CEP não encontrado');
          }
        },
        error: () => {
          this.isLoadingCep = false;
          this.snackbarManager.show('Erro ao consultar CEP. Tente novamente.');
        },
      })
    );
  }

  private preencherEndereco(dados: any) {
    const enderecoGroup = this.form.get('endereco') as FormGroup;
    enderecoGroup.patchValue({
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf,
    });
  }

  formatarCEP(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    this.form.get('endereco.cep')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.form.valid) {
      this.eventoSubmited.emit(this.form.value);
    } else {
      this.snackbarManager.show(
        'Por favor, preencha todos os campos obrigatórios!'
      );
    }
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['evento'] && changes['evento'].currentValue) {
      this.form.patchValue(changes['evento'].currentValue);
    }
  }

  get formControl(): AbstractControl {
    return this.form;
  }

  get infoBasicasControl(): AbstractControl {
    return this.form.get('infoBasicas')!;
  }

  get detalhesControl(): AbstractControl {
    return this.form.get('detalhes')!;
  }

  get periodoControl(): AbstractControl {
    return this.form.get('periodo')!;
  }

  get enderecoControl(): AbstractControl {
    return this.form.get('endereco')!;
  }

  get linkControl(): AbstractControl {
    return this.form.get('links')!;
  }

  get secretariaResponsavelControl(): AbstractControl {
    return this.form.get('secretariaResponsavel')!;
  }
}
