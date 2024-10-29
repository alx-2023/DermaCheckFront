export class Tratamiento {
  idTratamiento: number = 0;
  nombreTratamiento: string = '';
  descripcionTratamiento: string = '';
  materialMedicinal: string = '';
  comentario: string = '';
  fechaInicio: Date = new Date();
  fechaFinal: Date = new Date();
  estado: boolean = false;
}
