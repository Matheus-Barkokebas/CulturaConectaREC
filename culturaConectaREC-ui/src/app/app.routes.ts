import { Routes } from '@angular/router';

import { EditSecretariaComponent } from './secretaria/edit-secretaria/edit-secretaria.component';
import { NewSecretariaComponent } from './secretaria/new-secretaria/new-secretaria.component';
import { ListSecretariaComponent } from './secretaria/list-secretaria/list-secretaria.component';
import { MenuSecretariaComponent } from './commons/components/menu/secretaria/secretaria.component';
import { MenuUsuarioComponent } from './commons/components/menu/usuario/usuario.component';
import { NewEventoComponent } from './evento/new-evento/new-evento.component';
import { ListEventoComponent } from './evento/list-evento/list-evento.component';
import { EditEventoComponent } from './evento/edit-evento/edit-evento.component';
import { EditUsuarioComponent } from './usuario/edit-usuario/edit-usuario.component';
import { NewUsuarioComponent } from './usuario/new-usuario/new-usuario.component';
import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';
import { CalendarioComponent } from './calendario/calendario.component';

export const routes: Routes = [

  //SECRETARIA ROUTES
  { path: 'new/secretaria', component: NewSecretariaComponent, data: { title: 'Cadastrar secretaria' } },
  { path: 'list/secretaria', component: ListSecretariaComponent, data: { title: 'Listar secretaria' } },
  { path: 'edit/secretaria/:id', component: EditSecretariaComponent, data: { title: 'Atualizar secretaria' } },
  { path: 'menu/secretaria', component: MenuSecretariaComponent, data: { title: 'Menu Secretaria' } },

  //USUARIO ROUTES
  { path: 'new/usuario', component: NewUsuarioComponent, data: { title: 'Cadastrar Usuario' } },
  { path: 'list/usuario', component: ListUsuarioComponent, data: { title: 'Listar Usuario' } },
  { path: 'edit/usuario/:id', component: EditUsuarioComponent, data: { title: 'Editar Usuario' } },
  { path: 'menu/usuario', component: MenuUsuarioComponent, data: { title: 'Menu Usuario' } },

  //EVENTO ROUTES
  { path: 'new/evento', component: NewEventoComponent, data: { title: 'Cadastrar Evento' } },
  { path: 'list/evento', component: ListEventoComponent, data: { title: 'Listar Evento' } },
  { path: 'edit/evento/:id', component: EditEventoComponent, data: { title: 'Editar Eventos' } },

   //CALENDARIO ROUTES
   { path: 'calendario', component: CalendarioComponent, data: { title: 'Calendario' } },
];
