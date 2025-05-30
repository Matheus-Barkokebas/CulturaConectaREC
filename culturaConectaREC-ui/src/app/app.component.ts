import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { NewSecretariaComponent } from './secretaria/new-secretaria/new-secretaria.component';
import { ListSecretariaComponent } from './secretaria/list-secretaria/list-secretaria.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NewUsuarioComponent } from './usuario/new-usuario/new-usuario.component';
import { CardHeaderComponent } from './commons/components/card-header/card-header.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CardHeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'culturaConectaRec';

  isLoggedIn: boolean = false;

  private subscriptions = new Subscription();
  private authSubscription?: Subscription;

 constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (!loggedIn && this.router.url !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
