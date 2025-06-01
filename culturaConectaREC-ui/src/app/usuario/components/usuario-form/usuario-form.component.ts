import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../usuario.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Secretaria } from '../../../secretaria/secretaria.models';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { UsuarioService } from '../../../services/api/usuario/usuario.service';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { MatTableModule } from '@angular/material/table';
import { ISecretariaService } from '../../../services/api/secretaria/isecretaria.service';
import { SecretariaService } from '../../../services/api/secretaria/secretaria.service';
import { Permissoes } from '../../../services/api/usuario/usuario.models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class UsuarioFormComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  secretarias: Secretaria[] = [];

  permissoes = Object.values(Permissoes);

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpServiceSecretaria: ISecretariaService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService
  ) {}

  @Input() usuario: Usuario = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    cargo: '',
    secretaria: {
      id: 0,
      nome: '',
    },
    permissao: Permissoes.ROLE_USER,
  };

  @Output() usuarioSubmited = new EventEmitter<Usuario>();

  onSubmit(_: NgForm) {
    this.usuarioSubmited.emit(this.usuario);
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
