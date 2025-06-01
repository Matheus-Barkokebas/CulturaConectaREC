import { Itens } from '../../../itens/itens.model';
import { Secretaria } from '../../../secretaria/secretaria.models';

export interface InfoBasicas {
  nome: string;
  descricao: string;
  status: string;
}

export interface Periodo {
  dataInicio: Date;
  dataFim: Date;
  horarioInicio: string;
  horarioFim: string;
}

export interface Endereco {
  espacoPublico: string;
  tipoEspaco: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  pontoReferencia: string;
  linkGoogleMaps: string;
}

export interface Detalhes {
  periodicidade: string;
  categoria: string;
  capacidade: number;
  espacoCoberto: boolean;
  acessivel: boolean;
  estacionamento: boolean;
  possuiBanheiros: boolean;
  wifiDisponivel: boolean;
  equipamentosFornecidos: string;
}

export interface Links {
  linkSiteOficial: string;
  linkMapa: string;
}

export interface ContatosEvento {
  contatosEvento: string;
}

export class EventoDto {
  id: number;
  infoBasicas: InfoBasicas;
  periodo: Periodo;
  endereco: Endereco;
  detalhes: Detalhes;
  links: Links;
  contatosEvento: ContatosEvento;
  secretariaResponsavel: Secretaria;

  constructor(
    id: number,
    infoBasicas: InfoBasicas,
    periodo: Periodo,
    endereco: Endereco,
    detalhes: Detalhes,
    links: Links,
    contatosEvento: ContatosEvento,
    secretariaResponsavel: Secretaria
  ) {
    this.id = id;
    this.infoBasicas = infoBasicas;
    this.periodo = periodo;
    this.endereco = endereco;
    this.detalhes = detalhes;
    this.links = links;
    this.contatosEvento = contatosEvento;
    this.secretariaResponsavel = secretariaResponsavel;
  }
}
