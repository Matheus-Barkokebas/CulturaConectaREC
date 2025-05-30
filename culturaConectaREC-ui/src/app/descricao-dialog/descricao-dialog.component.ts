import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Evento } from '../evento/evento.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-descricao-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './descricao-dialog.component.html',
  styleUrl: './descricao-dialog.component.scss'
})
export class DescricaoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      evento: Evento;
      onUpdate: () => void;
      onDelete: () => void;
    },
    private dialogRef: MatDialogRef<DescricaoDialogComponent>
  ) {}

  fecharModal() {
    this.dialogRef.close();
  }

  update() {
    this.data.onUpdate();
    this.fecharModal();
  }

  delete() {
    this.data.onDelete();
    this.fecharModal();
  }
}
