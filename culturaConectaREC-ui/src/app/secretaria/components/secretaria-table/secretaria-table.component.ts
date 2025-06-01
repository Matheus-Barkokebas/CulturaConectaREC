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
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Secretaria } from '../../secretaria.models';

@Component({
  selector: 'app-secretaria-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  templateUrl: './secretaria-table.component.html',
  styleUrl: './secretaria-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class SecretariaTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() secretarias: Secretaria[] = [];

  dataSource!: MatTableDataSource<Secretaria>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nome', 'actions'];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<Secretaria>();

  @Output() onRequestUpdate = new EventEmitter<Secretaria>();

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['secretarias'] && this.secretarias) {
      this.dataSource = new MatTableDataSource<Secretaria>(this.secretarias);
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

  update(secretaria: Secretaria) {
    this.onRequestUpdate.emit(secretaria);
  }

  delete(secretaria: Secretaria) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão da secretaria',
        content: `Confirma a exclusão da secretaria ${secretaria.nome}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(secretaria);
          const updatedList = this.dataSource.data.filter(
            (c) => c.id !== secretaria.id
          );
          this.dataSource = new MatTableDataSource<Secretaria>(updatedList);
        }
      });
  }
}
