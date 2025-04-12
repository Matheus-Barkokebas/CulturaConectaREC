import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { EventoService } from '../../../services/api/evento/evento.service';
import { SecretariaService } from '../../../services/api/secretaria/secretaria.service';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Secretaria } from '../../../secretaria/secretaria.models';
import { ISecretariaService } from '../../../services/api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { Evento } from '../../evento.model';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-evento-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './evento-form.component.html',
  styleUrl: './evento-form.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EventoFormComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  secretarias: Secretaria[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpServiceSecretaria: ISecretariaService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService
  ) {}

  @Input() evento: Evento = {
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

  @Output() eventoSubmited = new EventEmitter<Evento>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.eventoSubmited.emit(this.evento);
    } else {
      this.snackbarManager.show(
        'Por favor, preencha todos os campos obrigatórios!'
      );
    }
  }

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpServiceSecretaria
        .list()
        .subscribe((data) => (this.secretarias = data))
    );
  }
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }
}
