import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { TipoItens } from '../../tipoItens.models';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-tipo-itens-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  templateUrl: './tipo-itens-table.component.html',
  styleUrl: './tipo-itens-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class TipoItensTableComponent implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() tipoItens: TipoItens[] = [];

  dataSource!: MatTableDataSource<TipoItens>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nome', 'actions'];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<TipoItens>();

  @Output() onRequestUpdate = new EventEmitter<TipoItens>();

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoItens'] && this.tipoItens) {
      this.dataSource = new MatTableDataSource<TipoItens>(this.tipoItens);
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

  update(tipoItens: TipoItens) {
    this.onRequestUpdate.emit(tipoItens);
  }

  delete(tipoItens: TipoItens) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do tipo do item',
        content: `Confirma a exclusão desse tipo de item ${tipoItens.nome}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(tipoItens);
          const updatedList = this.dataSource.data.filter(
            (c) => c.id !== tipoItens.id
          );
          this.dataSource = new MatTableDataSource<TipoItens>(updatedList);
        }
      });
  }
}
