import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Secretaria } from '../../secretaria.models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-secretaria-form',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './secretaria-form.component.html',
  styleUrl: './secretaria-form.component.scss',
})
export class SecretariaFormComponent {
  @Input() secretaria: Secretaria = {
    id: 0,
    nome: '',
  };

  @Output() secretariaSubmited = new EventEmitter<Secretaria>();

  onSubmit(_: NgForm) {
    this.secretariaSubmited.emit(this.secretaria);
  }
}
