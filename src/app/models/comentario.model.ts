import { ComentarioUsuarioModel } from "./comentario-usuario.model";

export type ComentarioModel = {
  id?: number,
  texto: string,
  usuario: ComentarioUsuarioModel,
  respostas: ComentarioModel[]
};
