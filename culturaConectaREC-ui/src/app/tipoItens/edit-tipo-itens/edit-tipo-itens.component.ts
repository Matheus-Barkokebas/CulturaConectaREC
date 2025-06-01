import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { TipoItensService } from '../../services/api/tipoItens/tipoItens.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { TipoItensFormComponent } from '../components/tipo-itens-form/tipo-itens-form.component';
import { TipoItens } from '../tipoItens.models';
import { ITipoItensService } from '../../services/api/tipoItens/itipoItens.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-tipo-itens',
  imports: [TipoItensFormComponent],
  templateUrl: './edit-tipo-itens.component.html',
  styleUrl: './edit-tipo-itens.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.TIPOITENS, useClass: TipoItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditTipoItensComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  tipoItens: TipoItens = { id: 0, nome: '' };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TIPOITENS)
    private readonly httpService: ITipoItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informacoes do tipo item');
      this.router.navigate(['list/tipoItens']);
      return;
    }
    this.httpsubscriptions?.push(
      this.httpService
        .findByID(Number(id))
        .subscribe((data) => (this.tipoItens = data))
    );
  }
  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: TipoItens) {
    if (value.id) {
      this.httpsubscriptions?.push(
        this.httpService.update(value.id, value).subscribe((_) => {
          this.snackBarManager.show('Tipo item autalizado com sucesso');
          this.router.navigate(['list/tipoItens']);
        })
      );
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['list/tipoItens']);
  }
}
