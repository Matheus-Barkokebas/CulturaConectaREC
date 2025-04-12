import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SecretariaService } from '../../services/api/secretaria/secretaria.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { SecretariaFormComponent } from '../components/secretaria-form/secretaria-form.component';
import { Subscription } from 'rxjs';
import { ISecretariaService } from '../../services/api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Secretaria } from '../secretaria.models';

@Component({
  selector: 'app-edit-secretaria',
  imports: [SecretariaFormComponent],
  templateUrl: './edit-secretaria.component.html',
  styleUrl: './edit-secretaria.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditSecretariaComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  secretaria: Secretaria = { id: 0, nome: '' };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpService: ISecretariaService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informacoes da secretaria');
      this.router.navigate(['list/secretaria']);
      return;
    }
    this.httpsubscriptions?.push(
      this.httpService
        .findByID(Number(id))
        .subscribe((data) => (this.secretaria = data))
    );
  }
  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: Secretaria) {
    if (value.id) {
      this.httpsubscriptions?.push(
        this.httpService.update(value.id, value).subscribe((_) => {
          this.snackBarManager.show('Secrtaria autalizada com sucesso');
          this.router.navigate(['list/secretaria']);
        })
      );
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['list/secretaria']);
  }
}
