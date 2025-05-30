import { TipoItens } from "../../../tipoItens/tipoItens.models";

export class ItensDto {
  id: number;
  nome: string;
  tipoItens: TipoItens;

  constructor(id: number, nome: string, tipoItens: TipoItens) {
    this.id = id;
    this.nome = nome;
    this.tipoItens = tipoItens;
  }
}

export class SaveItensDto {
  nome: string;
  tipoItens: TipoItens;

  constructor(nome: string, tipoItens: TipoItens) {
    this.nome = nome;
    this.tipoItens = tipoItens;
  }
}
