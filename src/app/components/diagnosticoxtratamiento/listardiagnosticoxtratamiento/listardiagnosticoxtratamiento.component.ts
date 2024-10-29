import { Component, OnInit } from '@angular/core';
import { DiagnosticoxTratamiento } from '../../../models/DiagnosticoxTratamiento';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DiagnosticoxtratamientoService } from '../../../services/diagnosticoxtratamiento.service';

@Component({
  selector: 'app-listardiagnosticoxtratamiento',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listardiagnosticoxtratamiento.component.html',
  styleUrl: './listardiagnosticoxtratamiento.component.css'
})
export class ListardiagnosticoxtratamientoComponent implements OnInit {
  dataSource: MatTableDataSource<DiagnosticoxTratamiento> = new MatTableDataSource(); 
  displayedColumns: string[] = ['Id', 'PunctuationDiagnostic', 'NameTratment'];
  constructor(private dS: DiagnosticoxtratamientoService) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}
