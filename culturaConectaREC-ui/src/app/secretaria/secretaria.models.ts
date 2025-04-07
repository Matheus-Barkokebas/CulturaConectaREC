export class SecretariaModelForm {
  id?: number;
  nome: string;

  constructor(id: number, nome: string){
    this.id = id;
    this.nome = nome
  }
}

export class SecretariaModelTable {
  id: number;
  nome: string;

  constructor(id: number, nome: string){
    this.id = id;
    this.nome = nome
  }
}
