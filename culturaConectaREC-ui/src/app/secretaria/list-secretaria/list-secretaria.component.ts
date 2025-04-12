import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SecretariaService } from '../../services/api/secretaria/secretaria.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { SecretariaTableComponent } from '../components/secretaria-table/secretaria-table.component';
import { Subscription } from 'rxjs';
import { ISecretariaService } from '../../services/api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { Secretaria } from '../secretaria.models';

@Component({
  selector: 'app-list-secretaria',
  imports: [SecretariaTableComponent, MatTabsModule],
  templateUrl: './list-secretaria.component.html',
  styleUrl: './list-secretaria.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListSecretariaComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  @Input() secretarias: Secretaria[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpService: ISecretariaService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.secretarias = data))
    );
  }
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(secretaria: Secretaria) {
    this.router.navigate(['edit/secretaria', secretaria.id]);
  }

  delete(secretaria: Secretaria) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(secretaria.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `A secretaria ${secretaria.nome} foi excluida com sucesso`
          )
        )
    );
  }
}
