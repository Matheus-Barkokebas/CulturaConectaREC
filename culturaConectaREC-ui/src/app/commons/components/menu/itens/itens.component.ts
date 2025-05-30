import { Component, Inject } from '@angular/core';
import { NewItensComponent } from '../../../../itens/new-itens/new-itens.component';
import { ListItensComponent } from '../../../../itens/list-itens/list-itens.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SERVICES_TOKEN } from '../../../../services/service.token';
import { ItensService } from '../../../../services/api/itens/itens.service';
import { Itens } from '../../../../itens/itens.model';
import { Subscription } from 'rxjs';
import { IItensService } from '../../../../services/api/itens/iitens.service';

@Component({
  selector: 'app-itens',
  imports: [
    NewItensComponent,
    ListItensComponent,
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.scss',
  providers: [{ provide: SERVICES_TOKEN.HTTP.ITENS, useClass: ItensService }],
})
export class MenuItensComponent {
  currentIndex: number = 0;

  itens: Itens[] = [];

  private httpSubscriptions: Subscription[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.ITENS)
    private readonly httpService: IItensService
  ) {}

  changeTabToListItens() {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.itens = data))
    );

    this.currentIndex = 1;
  }
}
