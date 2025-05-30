export class TipoItensDto {
  id: number;
  nome: string;

  constructor(id: number, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}

export class SaveTipoItensDto {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}
