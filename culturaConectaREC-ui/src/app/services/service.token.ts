import { InjectionToken } from "@angular/core";
import { ISecretariaService } from "./api/secretaria/isecretaria.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";

export const SERVICES_TOKEN = {
  HTTP: {
    SECRETARIA: new InjectionToken<ISecretariaService>('SERVICES_TOKEN.HTTP.SECRETARIA'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>('SNACKBAR_TOKEN.SNACKBAR'),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG')

};
