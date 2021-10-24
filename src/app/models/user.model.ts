import { ConteudoModel } from './conteudo.model';

export type User = {
  id: number;
  token: string;
  nome: string;
  userProfile?: any;
  roles: string[];
  refreshToken: string;
};

export type UserProfile = {
  id?: number;
  refreshToken?: string;
  tipo?: number;
  nome: string;
  descricao: string;
  email: string
  senha?: string;
  cpf?: string;
  rg?: string;
  whatsApp?: string;
  dataNascimento?: string
  genero?: number,
  cidade?: string;
  uf?: string;
  escolaridade?: number,
  instituicao?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  foto?: string;
  comentarios?: [];
  conteudosAssistidos?: Array<ConteudoModel>;
  dataRespostaSolicitacaoMentoria?: string;
  dataSolicitacaoMentoria?: string;
  educador?: number;
  notificacoesUsuarios?: string;
  respostaSolicitacaoMentoria?: string;
};

export type MentorProfile = {
  id?: number;
  refreshToken?: string;
  tipo?: number;
  nome: string;
  descricao: string;
  email: string
  senha?: string;
  cpf?: string;
  rg?: string;
  whatsApp?: string;
  dataNascimento?: string
  genero?: number,
  cidade?: string;
  uf?: string;
  escolaridade?: number,
  instituicao?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  foto?: string;
  biografia?: string;
  numeroMaximoMentorias?: number;
};

export enum ROLE_USUARIO {
  NAOINFORMADO = 'NaoInformado',
  ADMINISTRADOR = 'Administrador',
  MENTORADO = 'Mentorado',
  EDUCADOR = 'Educador',
  MENTOR = 'Mentor'
}

export enum TIPO_USUARIO {
  'Não Informado' = 0,
  'Administrador' = 1,
  'Mentorado' = 2,
  'Educador' = 3,
  'Mentor' = 4,
}

export enum TIPO_GENERO {
  'Não Informado' = 0,
  'Feminino' = 1,
  'Masculino' = 2,
  'Outro' = 3
}

export enum TIPO_ESCOLARIDADE {
  'Nao Informado' = 0,
  'Fundamental Incompleto' = 1,
  'Fundamental Completo' = 2,
  'Medio Incompleto' = 3,
  'Medio Completo' = 4,
  'Superior Incompleto' = 5,
  'Superior Completo' = 6,
  'Mestrado Incompleto' = 7,
  'Mestrado Completo' = 8,
  'Doutorado Incompleto' = 9,
  'Doutorado Completo' = 10,
  'Outro' = 11
}
