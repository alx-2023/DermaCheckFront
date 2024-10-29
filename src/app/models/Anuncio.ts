import { Usuario } from './Usuario';

export class Anuncio {
  idAnuncio: number = 0;
  url: string = '';
  descripcion: string = '';
  creditos: number = 0;
  ingresosPorAnuncioSoles: number = 0;
  duracionMinutos: number = 0;
  usuario: Usuario = new Usuario();
}
