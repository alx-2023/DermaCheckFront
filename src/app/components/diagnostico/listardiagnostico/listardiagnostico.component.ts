import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diagnostico } from '../../../models/Diagnostico';
import { DiagnosticoService } from '../../../services/diagnostico.service';

@Component({
  selector: 'app-listardiagnostico',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listardiagnostico.component.html',
  styleUrl: './listardiagnostico.component.css'
})
export class ListardiagnosticoComponent implements OnInit{
  dataSource: MatTableDataSource<Diagnostico> = new MatTableDataSource(); 
  displayedColumns: string[] = ['Id', 'DateDiagnostic', 'HourDiagnostic', 'Imagen', 'Punctuation', 'UserId', 'Enfermedad', 'CentroMedico'];
  constructor(private dS: DiagnosticoService) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}
