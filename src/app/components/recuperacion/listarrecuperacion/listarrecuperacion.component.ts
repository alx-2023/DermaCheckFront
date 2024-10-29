import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recuperacion } from '../../../models/Recuperacion';
import { RecuperacionService } from '../../../services/recuperacion.service';

@Component({
  selector: 'app-listarrecuperacion',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarrecuperacion.component.html',
  styleUrl: './listarrecuperacion.component.css'
})
export class ListarrecuperacionComponent implements OnInit {
  dataSource: MatTableDataSource<Recuperacion> = new MatTableDataSource();
  displayedColumns: string [] = ['Id', 'DateApplication', 'RecuperationCode', 'State', 'ExpirationDate'];
  constructor(private rS: RecuperacionService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}
