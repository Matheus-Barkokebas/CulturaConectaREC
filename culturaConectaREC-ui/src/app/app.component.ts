import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { NewSecretariaComponent } from "./secretaria/new-secretaria/new-secretaria.component";

@Component({
  selector: 'app-root',
  imports: [NewSecretariaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'culturaConectaRec';

  private routeSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getRouteTitle(this.activatedRoute))
      )
      .subscribe(title => this.title = title);
  }

  private getRouteTitle(route: ActivatedRoute): string {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild;
    }

    return child.snapshot.data['title'] || 'Default Title';
  }
}
