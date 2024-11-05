import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ArticulosDermatologicos } from '../../../models/ArticulosDermatologicos';
import { ArticulosdermatologicosService } from '../../../services/articulosdermatologicos.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listararticulosdermatologicos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginator, MatIconModule, RouterModule, MatTableModule],
  templateUrl: './listararticulosdermatologicos.component.html',
  styleUrl: './listararticulosdermatologicos.component.css',
})
export class ListararticulosdermatologicosComponent implements OnInit {
  dataSource: ArticulosDermatologicos[] = [];
  displayedColumns: string[] = ['Id', 'Nombre', 'Tipo', 'Descripcion', 'URL', 'Usuario'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: ArticulosDermatologicos[] = [];
  constructor(private cS: ArticulosdermatologicosService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      {
       this.dataSource = data;
      this.updatePagedData();
      }
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = data;
      this.updatePagedData();
    });
  }
  updatePagedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.dataSource.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }
  eliminar(id: number): void {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.dataSource = data; 
        this.updatePagedData();  
      });
    });
  }
}
