import { Component } from '@angular/core';
import { DiagnosticoxtratamientoService } from '../../../services/diagnosticoxtratamiento.service';
import { EstadoFALSEDTO } from '../../../models/EstadoFALSEDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportediagxtratafalse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportediagxtratafalse.component.html',
  styleUrl: './reportediagxtratafalse.component.css'
})
export class ReportediagxtratafalseComponent {

  tratamientos: EstadoFALSEDTO[] = [];

  constructor(private dtS:DiagnosticoxtratamientoService){}
  
  ngOnInit(): void {
    this.dtS.desable().subscribe((data) => {
      console.log(data);  // Verifica si los datos contienen 'IdUsuario' con la propiedad 'idUsuario'
      this.tratamientos = data;
    });
  }
  
}
