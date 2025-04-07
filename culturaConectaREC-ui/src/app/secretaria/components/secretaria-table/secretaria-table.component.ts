import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SecretariaModelForm } from '../../secretaria.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-secretaria-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './secretaria-table.component.html',
  styleUrl: './secretaria-table.component.scss'
})
export class SecretariaTableComponent {

}
