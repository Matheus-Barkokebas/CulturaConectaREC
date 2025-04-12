import { Secretaria } from '../secretaria/secretaria.models';

export class Evento {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  localizacao: string;
  tipo: string;
  status: string;
  secretariaResponsavel: Secretaria;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    dataInicio: Date,
    dataFim: Date,
    localizacao: string,
    tipo: string,
    status: string,
    secretariaResponsavel: Secretaria
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.localizacao = localizacao;
    this.tipo = tipo;
    this.status = status;
    this.secretariaResponsavel = secretariaResponsavel;
  }
}
