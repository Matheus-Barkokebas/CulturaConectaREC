import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NewSecretariaComponent } from '../../../../secretaria/new-secretaria/new-secretaria.component';
import { ListSecretariaComponent } from '../../../../secretaria/list-secretaria/list-secretaria.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SERVICES_TOKEN } from '../../../../services/service.token';
import { SecretariaService } from '../../../../services/api/secretaria/secretaria.service';
import { Secretaria } from '../../../../secretaria/secretaria.models';
import { Subscription } from 'rxjs';
import { ISecretariaService } from '../../../../services/api/secretaria/isecretaria.service';

@Component({
  selector: 'app-secretaria',
  imports: [
    CommonModule,
    NewSecretariaComponent,
    ListSecretariaComponent,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './secretaria.component.html',
  styleUrl: './secretaria.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SECRETARIA, useClass: SecretariaService },
  ],
})
export class MenuSecretariaComponent {
  currentIndex: number = 0;

  secretaria: Secretaria[] = [];

  private httpSubscriptions: Subscription[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SECRETARIA)
    private readonly httpService: ISecretariaService
  ) {}

  changeTabToListSecretaria() {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.secretaria = data))
    );

    this.currentIndex = 1;
  }
}
