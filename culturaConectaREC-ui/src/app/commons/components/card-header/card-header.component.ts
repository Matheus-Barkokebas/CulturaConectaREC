import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('mobileMenuTemplate') mobileMenuTemplate!: TemplateRef<any>;
  userRole: string | null = null;
  isLoggedIn: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private readonly router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(
        (status) => (this.isLoggedIn = status)
      )
    );

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.userRole = role))
    );
  }

  openMobileMenu() {
    this.dialog.open(this.mobileMenuTemplate, {
      position: { top: '70px', right: '16px' },
      panelClass: 'mobile-menu-dialog',
      backdropClass: 'mobile-menu-backdrop',
      autoFocus: false,
    });
  }

  navigateTo(path: string) {
    this.dialog.closeAll();
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
