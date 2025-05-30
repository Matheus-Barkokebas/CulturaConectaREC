import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ItensService } from '../../services/api/itens/itens.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ItensFormComponent } from '../components/itens-form/itens-form.component';
import { Subscription } from 'rxjs';
import { IItensService } from '../../services/api/itens/iitens.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ItensDto } from '../../services/api/itens/itens.models';

@Component({
  selector: 'app-new-itens',
  imports: [ItensFormComponent],
  templateUrl: './new-itens.component.html',
  styleUrl: './new-itens.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.ITENS, useClass: ItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewItensComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() savedItens = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.ITENS)
    private readonly httpService: IItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitItens(value: ItensDto) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Item cadastrado com sucesso');

      this.savedItens.emit();
    });
  }
}
