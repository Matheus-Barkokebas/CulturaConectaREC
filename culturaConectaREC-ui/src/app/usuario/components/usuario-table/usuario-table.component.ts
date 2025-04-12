import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { Usuario } from '../../usuario.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-usuario-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class UsuarioTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() usuario: Usuario[] = [];

  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'nome',
    'secretaria',
    'cargo',
    'cpf',
    'email',
    'permissao',
    'senha',
    'actions',
  ];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<Usuario>();

  @Output() onRequestUpdate = new EventEmitter<Usuario>();

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && this.usuario) {
      this.dataSource = new MatTableDataSource<Usuario>(this.usuario);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe();
    }
  }

  update(usuario: Usuario) {
    this.onRequestUpdate.emit(usuario);
  }

  delete(usuario: Usuario) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do usuario',
        content: `Confirma a exclusão do usuario ${usuario.nome}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(usuario);
          const updatedList = this.dataSource.data.filter(
            (c) => c.id !== usuario.id
          );
          this.dataSource = new MatTableDataSource<Usuario>(updatedList);
        }
      });
  }
}
