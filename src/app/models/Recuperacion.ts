import { Usuario } from './Usuario';

export class Recuperacion {
  idRecuperacion: number = 0;
  fechaSolicitud: Date = new Date();
  codigoRecuperacion: number = 0;
  estadoRecuperacion: boolean = false;
  fechaExpiracion: Date = new Date();
  usuario: Usuario = new Usuario();
}
