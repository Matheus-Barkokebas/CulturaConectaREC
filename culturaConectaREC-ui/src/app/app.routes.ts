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
import { LoginComponent } from './login/login.component';
import { NewTipoItensComponent } from './tipoItens/new-tipo-itens/new-tipo-itens.component';
import { ListTipoItensComponent } from './tipoItens/list-tipo-itens/list-tipo-itens.component';
import { EditTipoItensComponent } from './tipoItens/edit-tipo-itens/edit-tipo-itens.component';
import { MenuTipoItensComponent } from './commons/components/menu/tipo-itens/tipo-itens.component';
import { NewItensComponent } from './itens/new-itens/new-itens.component';
import { ListItensComponent } from './itens/list-itens/list-itens.component';
import { EditItensComponent } from './itens/edit-itens/edit-itens.component';
import { MenuItensComponent } from './commons/components/menu/itens/itens.component';

export const routes: Routes = [

  // ROTA PADRÃO
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //LOGIN ROUTES
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },

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

   //TIPO ITENS ROUTES
  { path: 'new/tipoItens', component: NewTipoItensComponent, data: { title: 'Cadastrar Tipo Item' } },
  { path: 'list/tipoItens', component: ListTipoItensComponent, data: { title: 'Listar Tipo Item' } },
  { path: 'edit/tipoItens/:id', component: EditTipoItensComponent, data: { title: 'Editar Tipo Item' } },
  { path: 'menu/tipoItens', component: MenuTipoItensComponent, data: { title: 'Menu Tipo Item' } },

   //ITENS ROUTES
  { path: 'new/itens', component: NewItensComponent, data: { title: 'Cadastrar Item' } },
  { path: 'list/itens', component: ListItensComponent, data: { title: 'Listar Item' } },
  { path: 'edit/itens/:id', component: EditItensComponent, data: { title: 'Editar Item' } },
  { path: 'menu/itens', component: MenuItensComponent, data: { title: 'Menu Item' } },
];
