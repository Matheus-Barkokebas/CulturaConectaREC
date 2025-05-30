import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { UsuarioService } from '../../services/api/usuario/usuario.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IUsuarioService } from '../../services/api/usuario/iusuario.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { UsuarioFormComponent } from '../components/usuario-form/usuario-form.component';
import { UsuarioDto } from '../../services/api/usuario/usuario.models';

@Component({
  selector: 'app-new-usuario',
  imports: [UsuarioFormComponent],
  templateUrl: './new-usuario.component.html',
  styleUrl: './new-usuario.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewUsuarioComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() savedUser = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpService: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitUsuario(value: UsuarioDto) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('usuario cadastrado com sucesso');

      this.savedUser.emit();
    });
  }
}
