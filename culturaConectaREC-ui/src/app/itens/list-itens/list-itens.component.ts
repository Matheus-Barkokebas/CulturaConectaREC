import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ItensTableComponent } from '../components/itens-table/itens-table.component';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ItensService } from '../../services/api/itens/itens.service';
import { Subscription } from 'rxjs';
import { Itens } from '../itens.model';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { IItensService } from '../../services/api/itens/iitens.service';

@Component({
  selector: 'app-list-itens',
  imports: [ItensTableComponent, MatTabsModule],
  templateUrl: './list-itens.component.html',
  styleUrl: './list-itens.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.ITENS, useClass: ItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListItensComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  @Input() itens: Itens[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.ITENS)
    private readonly httpService: IItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.itens = data))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(itens: Itens) {
    this.router.navigate(['edit/itens', itens.id]);
  }

  delete(itens: Itens) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(itens.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O item ${itens.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
