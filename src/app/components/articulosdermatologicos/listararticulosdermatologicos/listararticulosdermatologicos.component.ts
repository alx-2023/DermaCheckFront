import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArticulosDermatologicos } from '../../../models/ArticulosDermatologicos';
import { ArticulosdermatologicosService } from '../../../services/articulosdermatologicos.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listararticulosdermatologicos',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './listararticulosdermatologicos.component.html',
  styleUrl: './listararticulosdermatologicos.component.css',
})
export class ListararticulosdermatologicosComponent implements OnInit {
  dataSource: MatTableDataSource<ArticulosDermatologicos> =
    new MatTableDataSource();

  constructor(private aS: ArticulosdermatologicosService) {}

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
