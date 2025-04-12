import { InjectionToken } from '@angular/core';
import { ISecretariaService } from './api/secretaria/isecretaria.service';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { IDialogManagerService } from './idialog-manager.service';
import { IUsuarioService } from './api/usuario/iusuario.service';
import { IEventoService } from './api/evento/ievento.service';

export const SERVICES_TOKEN = {
  HTTP: {
    SECRETARIA: new InjectionToken<ISecretariaService>(
      'SERVICES_TOKEN.HTTP.SECRETARIA'
    ),
    USUARIO: new InjectionToken<IUsuarioService>('SERVICES_TOKEN.HTTP.USUARIO'),
    EVENTO: new InjectionToken<IEventoService>('SERVICES_TOKEN.HTTP.EVENTO'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SNACKBAR_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG'),
};
