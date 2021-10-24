export type ConteudoModel = {
  id?: number,
  idModulo: number,
  tipo: number,
  titulo: string,
  texto: string,
  url: string,
  concluido: boolean,
  ordem: number,
  qtdAssistidos: number,
  qtdComentarios: number
};
