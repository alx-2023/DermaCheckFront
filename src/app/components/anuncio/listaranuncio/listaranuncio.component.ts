import { Component, OnInit, ViewChild } from '@angular/core';
import { Anuncio } from '../../../models/Anuncio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AnuncioService } from '../../../services/anuncio.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-listaranuncio',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginator, MatIconModule, RouterModule, MatTableModule],
  templateUrl: './listaranuncio.component.html',
  styleUrl: './listaranuncio.component.css',
})
export class ListaranuncioComponent implements OnInit {
  dataSource: Anuncio[] = []; 
  displayedColumns: string[] = ['Id', 'Url', 'Descripcion', 'Creditos', 'Ingresos', 'Duracion', 'Usuario'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: Anuncio[] = [];
  constructor(private cS: AnuncioService) {}
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
