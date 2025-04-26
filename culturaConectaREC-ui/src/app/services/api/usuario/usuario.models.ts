import { Secretaria } from '../../../secretaria/secretaria.models';

export enum Permissoes {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export class UsuarioDto {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  cargo: string;
  secretaria: Secretaria;
  permissao: Permissoes;

  constructor(
    id: number,
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    cargo: string,
    secretaria: Secretaria,
    permissao: Permissoes
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
