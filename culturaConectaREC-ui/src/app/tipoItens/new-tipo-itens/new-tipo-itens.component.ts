import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { TipoItensFormComponent } from '../components/tipo-itens-form/tipo-itens-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { TipoItensService } from '../../services/api/tipoItens/tipoItens.service';
import { Subscription } from 'rxjs';
import { ITipoItensService } from '../../services/api/tipoItens/itipoItens.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { TipoItens } from '../tipoItens.models';

@Component({
  selector: 'app-new-tipo-itens',
  imports: [TipoItensFormComponent, MatTabsModule],
  templateUrl: './new-tipo-itens.component.html',
  styleUrl: './new-tipo-itens.component.scss',
  providers: [
      { provide: SERVICES_TOKEN.HTTP.TIPOITENS, useClass: TipoItensService },
      { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
    ],
})
export class NewTipoItensComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() savedTipoItens = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TIPOITENS)
    private readonly httpService: ITipoItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitTipoItens(value: TipoItens) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Tipo de item cadastrado com sucesso');

      this.savedTipoItens.emit();
    });
  }
}
