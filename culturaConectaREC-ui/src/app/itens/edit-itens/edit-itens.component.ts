import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ItensService } from '../../services/api/itens/itens.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { Itens } from '../itens.model';
import { IItensService } from '../../services/api/itens/iitens.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItensFormComponent } from '../components/itens-form/itens-form.component';

@Component({
  selector: 'app-edit-itens',
  imports: [ItensFormComponent],
  templateUrl: './edit-itens.component.html',
  styleUrl: './edit-itens.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.ITENS, useClass: ItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditItensComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  itens: Itens = {
    id: 0,
    nome: '',
    tipoItens: {
      id: 0,
      nome: '',
    },
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.ITENS)
    private readonly httpService: IItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informacoes do item');
      this.router.navigate(['list/itens']);
      return;
    }
    this.httpsubscriptions?.push(
      this.httpService
        .findByID(Number(id))
        .subscribe((data) => (this.itens = data))
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: Itens) {
    if (value.id) {
      this.httpsubscriptions?.push(
        this.httpService.update(value.id, value).subscribe((_) => {
          this.snackBarManager.show('Item autalizado com sucesso');
          this.router.navigate(['list/itens']);
        })
      );
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['list/itens']);
  }
}
