import { Secretaria } from '../../../secretaria/secretaria.models';

export class UsuarioDto {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  cargo: string;
  secretaria: Secretaria;
  permissao: string;

  constructor(
    id: number,
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    cargo: string,
    secretaria: Secretaria,
    permissao: string
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.cargo = cargo;
    this.secretaria = secretaria;
    this.permissao = permissao;
  }
}
