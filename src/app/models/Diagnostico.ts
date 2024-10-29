import { CentrosMedicos } from './CentrosMedicos';
import { Enfermedad } from './Enfermedad';
import { Usuario } from './Usuario';

export class Diagnostico {
  idDiagnostico: number = 0;
  fechaDiagnostico: Date = new Date();
  horaDiagnostico: string = '';
  imagenDiagnostico: Uint8Array = new Uint8Array();
  puntuacion: number = 0;
  enfermedad: Enfermedad = new Enfermedad();
  usuario: Usuario = new Usuario();
  centrosMedicos: CentrosMedicos = new CentrosMedicos();
}

