import { CentrosMedicos } from './CentrosMedicos';
import { Enfermedad } from './Enfermedad';
import { Usuario } from './Usuario';

export class Diagnostico {
  idDiagnostico: number = 0;
  fechaDiagnostico: Date = new Date();
  horaDiagnostico: Date = new Date();
  puntuacion: number = 0;
  enfermedad: Enfermedad = new Enfermedad();
  usuario: Usuario = new Usuario();
  centrosMedicos: CentrosMedicos = new CentrosMedicos();
}

