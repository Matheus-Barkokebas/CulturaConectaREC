import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { SecretariaModelForm } from '../../secretaria.models';

@Component({
  selector: 'app-secretaria-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './secretaria-form.component.html',
  styleUrl: './secretaria-form.component.scss'
})
export class SecretariaFormComponent {

  @Input() secretaria: SecretariaModelForm = {
    nome: ''
  }

  @Output() secretariaSubmited = new EventEmitter<SecretariaModelForm>();

  onSubmit(_: NgForm){
    this.secretariaSubmited.emit(this.secretaria);
  }
}
