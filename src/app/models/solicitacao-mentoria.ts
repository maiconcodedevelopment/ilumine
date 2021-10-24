export type SolicitacaoMentoria = {
  id: number;
  dataSolicitacao: string;
  dataResposta?: string;
  status: number;
  idUsuario: number;
  nome: string;
  foto: string;
  email: string;
  telefone: string;
};
