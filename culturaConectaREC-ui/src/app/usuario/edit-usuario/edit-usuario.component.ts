import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UsuarioFormComponent } from '../components/usuario-form/usuario-form.component';
import { SERVICES_TOKEN } from '../../services/service.token';
import { UsuarioService } from '../../services/api/usuario/usuario.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Usuario } from '../usuario.model';
import { IUsuarioService } from '../../services/api/usuario/iusuario.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-usuario',
  imports: [UsuarioFormComponent],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditUsuarioComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  usuario: Usuario = {
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
    permissao: '',
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpService: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informacoes do usuario');
      this.router.navigate(['list/usuario']);
      return;
    }
    this.httpsubscriptions?.push(
      this.httpService
        .findByID(Number(id))
        .subscribe((data) => (this.usuario = data))
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: Usuario) {
    if (value.id) {
      this.httpsubscriptions?.push(
        this.httpService.update(value.id, value).subscribe((_) => {
          this.snackBarManager.show('Usuario autalizado com sucesso');
          this.router.navigate(['list/usuario']);
        })
      );
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['list/usuario']);
  }
}
