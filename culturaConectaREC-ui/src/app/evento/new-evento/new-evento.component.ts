import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { EventoService } from '../../services/api/evento/evento.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { EventoFormComponent } from '../components/evento-form/evento-form.component';
import { Subscription } from 'rxjs';
import { IEventoService } from '../../services/api/evento/ievento.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Router } from '@angular/router';
import { EventoDto } from '../../services/api/evento/evento.models';

@Component({
  selector: 'app-new-evento',
  imports: [EventoFormComponent],
  templateUrl: './new-evento.component.html',
  styleUrl: './new-evento.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.EVENTO, useClass: EventoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewEventoComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.EVENTO)
    private readonly httpService: IEventoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitEvento(value: EventoDto) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Evento cadastrado com sucesso');
      this.router.navigate(['list/evento']);
    });
  }
}
