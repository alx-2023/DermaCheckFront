import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Enfermedad } from '../../../models/Enfermedad';
import { EnfermedadService } from '../../../services/enfermedad.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarenfermedad',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarenfermedad.component.html',
  styleUrls: ['./listarenfermedad.component.css'],
})
export class ListarenfermedadComponent implements OnInit {

  dataSource: MatTableDataSource<Enfermedad> = new MatTableDataSource();

  displayedColumns: string[] = ['ID', 'c2', 'c3','c4', 'accion01', 'accion02'];

  constructor(private eS: EnfermedadService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}



