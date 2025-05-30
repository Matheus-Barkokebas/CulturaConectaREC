import { TipoItens } from "../tipoItens/tipoItens.models";

export class Itens {
  id: number;
  nome: string;
  tipoItens: TipoItens;

  constructor(id: number, nome: string, tipoItens: TipoItens) {
    this.id = id;
    this.nome = nome;
    this.tipoItens = tipoItens;
  }
}
