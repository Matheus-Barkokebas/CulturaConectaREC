import { InjectionToken } from '@angular/core';
import { ISecretariaService } from './api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { IDialogManagerService } from './idialog-manager.service';
import { IUsuarioService } from './api/usuario/iusuario.service';
import { IEventoService } from './api/evento/ievento.service';
import { ITipoItensService } from './api/tipoItens/itipoItens.service';
import { IItensService } from './api/itens/iitens.service';

export const SERVICES_TOKEN = {
  HTTP: {
    SECRETARIA: new InjectionToken<ISecretariaService>(
      'SERVICES_TOKEN.HTTP.SECRETARIA'
    ),
    USUARIO: new InjectionToken<IUsuarioService>('SERVICES_TOKEN.HTTP.USUARIO'),
    EVENTO: new InjectionToken<IEventoService>('SERVICES_TOKEN.HTTP.EVENTO'),
    TIPOITENS: new InjectionToken<ITipoItensService>('SERVICES_TOKEN.HTTP.TIPOITENS'),
    ITENS: new InjectionToken<IItensService>('SERVICES_TOKEN.HTTP.ITENS'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SNACKBAR_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG'),
};
