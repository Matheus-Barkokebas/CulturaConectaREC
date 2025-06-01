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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Itens } from '../../itens.model';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-itens-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  templateUrl: './itens-table.component.html',
  styleUrl: './itens-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class ItensTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() itens: Itens[] = [];

  dataSource!: MatTableDataSource<Itens>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nome', 'tipo', 'actions'];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<Itens>();

  @Output() onRequestUpdate = new EventEmitter<Itens>();

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itens'] && this.itens) {
      this.dataSource = new MatTableDataSource<Itens>(this.itens);
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

  update(itens: Itens) {
    this.onRequestUpdate.emit(itens);
  }

  delete(itens: Itens) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do item',
        content: `Confirma a exclusão desse item ${itens.nome}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(itens);
          const updatedList = this.dataSource.data.filter(
            (c) => c.id !== itens.id
          );
          this.dataSource = new MatTableDataSource<Itens>(updatedList);
        }
      });
  }
}
