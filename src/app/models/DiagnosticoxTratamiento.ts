import { Diagnostico } from './Diagnostico';
import { Tratamiento } from './Tratamiento';

export class DiagnosticoxTratamiento {
  idDiagnosticoxTratamiento: number = 0;
  diagnostico: Diagnostico = new Diagnostico();
  tratamiento: Tratamiento = new Tratamiento();
}
