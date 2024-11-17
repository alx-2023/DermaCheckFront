import { Component, OnInit } from '@angular/core';
import { DiagnosticoxtratamientoService } from '../../../services/diagnosticoxtratamiento.service';
import { EstadoTRUEDTO } from '../../../models/EstadoTRUEDTO';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reportediagxtrataenable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportediagxtrataenable.component.html',
  styleUrl: './reportediagxtrataenable.component.css'
})
export class ReportediagxtrataenableComponent implements OnInit {
  
  
  tratamientos: EstadoTRUEDTO[] = [];


  constructor(private dtS:DiagnosticoxtratamientoService){}
  
  ngOnInit(): void {
    this.dtS.enable().subscribe((data) => {
      console.log(data);  // Verifica si los datos contienen 'IdUsuario' con la propiedad 'idUsuario'
      this.tratamientos = data;
    });
  }
  
}
