import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { TipoItensTableComponent } from '../components/tipo-itens-table/tipo-itens-table.component';
import { TipoItens } from '../tipoItens.models';
import { SERVICES_TOKEN } from '../../services/service.token';
import { TipoItensService } from '../../services/api/tipoItens/tipoItens.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ITipoItensService } from '../../services/api/tipoItens/itipoItens.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tipo-itens',
  imports: [TipoItensTableComponent, MatTabsModule],
  templateUrl: './list-tipo-itens.component.html',
  styleUrl: './list-tipo-itens.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.TIPOITENS, useClass: TipoItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListTipoItensComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  @Input() tipoItens: TipoItens[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TIPOITENS)
    private readonly httpService: ITipoItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.tipoItens = data))
    );
  }
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(tipoItens: TipoItens) {
    this.router.navigate(['edit/tipoItens', tipoItens.id]);
  }

  delete(tipoItens: TipoItens) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(tipoItens.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O tipo item ${tipoItens.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
