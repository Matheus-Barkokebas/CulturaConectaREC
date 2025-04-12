import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewUsuarioComponent } from '../../../../usuario/new-usuario/new-usuario.component';
import { ListUsuarioComponent } from '../../../../usuario/list-usuario/list-usuario.component';
import { Usuario } from '../../../../usuario/usuario.model';
import { Subscription } from 'rxjs';
import { IUsuarioService } from '../../../../services/api/usuario/iusuario.service';
import { SERVICES_TOKEN } from '../../../../services/service.token';
import { UsuarioService } from '../../../../services/api/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  imports: [
    CommonModule,
    NewUsuarioComponent,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ListUsuarioComponent,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
  ],
})
export class MenuUsuarioComponent {
  currentIndex: number = 0;

  usuario: Usuario[] = [];

  private httpSubscriptions: Subscription[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpService: IUsuarioService
  ) {}

  changeTabToListUser() {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.usuario = data))
    );

    this.currentIndex = 1;
  }
}
