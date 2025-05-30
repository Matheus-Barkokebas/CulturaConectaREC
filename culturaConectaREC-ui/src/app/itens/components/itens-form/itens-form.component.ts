import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Itens } from '../../itens.model';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { TipoItensService } from '../../../services/api/tipoItens/tipoItens.service';
import { TipoItens } from '../../../tipoItens/tipoItens.models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ItensService } from '../../../services/api/itens/itens.service';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-itens-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './itens-form.component.html',
  styleUrl: './itens-form.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.ITENS, useClass: ItensService },
    { provide: SERVICES_TOKEN.HTTP.TIPOITENS, useClass: TipoItensService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ItensFormComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  tipoItens: TipoItens[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TIPOITENS)
    private readonly tipoItensService: TipoItensService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService
  ) {}

  @Input() itens: Itens = {
    id: 0,
    nome: '',
    tipoItens: {
      id: 0,
      nome: '',
    },
  };

  @Output() itensSubmited = new EventEmitter<Itens>();

  onSubmit(_: NgForm) {
    this.itensSubmited.emit(this.itens);
  }

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.tipoItensService.list().subscribe((data) => (this.tipoItens = data))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }
}
