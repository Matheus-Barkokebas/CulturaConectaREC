import { Component, Inject, OnDestroy } from '@angular/core';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { SecretariaService } from '../../services/api/secretaria/secretaria.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SecretariaFormComponent } from '../components/secretaria-form/secretaria-form.component';
import { Subscription } from 'rxjs';
import { ISecretariaService } from '../../services/api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Router } from '@angular/router';
import { SecretariaModelForm } from '../secretaria.models';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-new-secretaria',
  imports: [SecretariaFormComponent, MatTabsModule],
  templateUrl: './new-secretaria.component.html',
  styleUrl: './new-secretaria.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewSecretariaComponent implements OnDestroy{

  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpService: ISecretariaService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitSecretaria(value: SecretariaModelForm) {
    const { id, ...request } = value;
    this.httpSubscription = this.httpService.save(request).subscribe((_) => {
      this.snackBarManager.show('secretaria cadastrado com sucesso');
      this.router.navigate(['secretaria/list']);
    });
  }

}
