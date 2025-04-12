import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { NewSecretariaComponent } from "./secretaria/new-secretaria/new-secretaria.component";
import { ListSecretariaComponent } from "./secretaria/list-secretaria/list-secretaria.component";
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NewUsuarioComponent } from "./usuario/new-usuario/new-usuario.component";
import { CardHeaderComponent } from './commons/components/card-header/card-header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CardHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'culturaConectaRec';

  private routeSubscription?: Subscription;

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
