import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SERVICES_TOKEN } from '../../../../services/service.token';
import { TipoItensService } from '../../../../services/api/tipoItens/tipoItens.service';
import { TipoItens } from '../../../../tipoItens/tipoItens.models';
import { Subscription } from 'rxjs';
import { ITipoItensService } from '../../../../services/api/tipoItens/itipoItens.service';
import { NewTipoItensComponent } from '../../../../tipoItens/new-tipo-itens/new-tipo-itens.component';
import { ListTipoItensComponent } from '../../../../tipoItens/list-tipo-itens/list-tipo-itens.component';

@Component({
  selector: 'app-tipo-itens',
  imports: [
    CommonModule,
    NewTipoItensComponent,
    ListTipoItensComponent,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tipo-itens.component.html',
  styleUrl: './tipo-itens.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.TIPOITENS, useClass: TipoItensService },
  ],
})
export class MenuTipoItensComponent {
  currentIndex: number = 0;

  tipoItens: TipoItens[] = [];

  private httpSubscriptions: Subscription[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TIPOITENS)
    private readonly httpService: ITipoItensService
  ) {}

  changeTabToListTipoItens() {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.tipoItens = data))
    );

    this.currentIndex = 1;
  }
}
