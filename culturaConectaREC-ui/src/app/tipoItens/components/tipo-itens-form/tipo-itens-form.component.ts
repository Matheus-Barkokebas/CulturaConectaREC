import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoItens } from '../../tipoItens.models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tipo-itens-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tipo-itens-form.component.html',
  styleUrl: './tipo-itens-form.component.scss',
})
export class TipoItensFormComponent {
  @Input() tipoItens: TipoItens = {
    id: 0,
    nome: '',
  };

  @Output() tipoItemSubmited = new EventEmitter<TipoItens>();

  onSubmit(_: NgForm) {
    this.tipoItemSubmited.emit(this.tipoItens);
  }
}
