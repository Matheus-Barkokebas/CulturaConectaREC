export class SecretariaDto {
  id: number;
  nome: string;

  constructor(id: number, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}

export class SaveSecretariaDto {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}
