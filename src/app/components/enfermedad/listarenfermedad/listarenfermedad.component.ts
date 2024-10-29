import { Component, OnInit } from '@angular/core';
import { Enfermedad } from '../../../models/Enfermedad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EnfermedadService } from '../../../services/enfermedad.service';

@Component({
  selector: 'app-listarenfermedad',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarenfermedad.component.html',
  styleUrl: './listarenfermedad.component.css'
})
export class ListarenfermedadComponent implements OnInit{
  dataSource: MatTableDataSource<Enfermedad> = new MatTableDataSource(); 
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'Symptoms'];
  constructor(private eS: EnfermedadService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}



