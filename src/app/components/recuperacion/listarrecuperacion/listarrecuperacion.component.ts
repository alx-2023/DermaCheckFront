import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recuperacion } from '../../../models/Recuperacion';
import { RecuperacionService } from '../../../services/recuperacion.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarrecuperacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginator, MatIconModule, RouterModule],
  templateUrl: './listarrecuperacion.component.html',
  styleUrl: './listarrecuperacion.component.css'
})
export class ListarrecuperacionComponent implements OnInit {
  dataSource: Recuperacion[] = [];
  displayedColumns: string [] = ['Id', 'codigo de recuperacion', 'Fecha de Solicitud','Fecha de Expiracion','Usuario','Estado']
  dataSource2 = new MatTableDataSource<Recuperacion>([]); // Inicializado con una lista vacía
  mensajeSinRegistros = 'No hay recuperaciones registradas';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: Recuperacion[] = [];
  constructor(private rS: RecuperacionService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      {
       this.dataSource = data;
      this.updatePagedData();
      }
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = data;
      this.updatePagedData();
    });
  }
    updatePagedData(): void {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedData = this.dataSource.slice(startIndex, endIndex);
    }
    onPageChange(event: PageEvent ): void {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.updatePagedData();
    }
    eliminar(id: number): void {
      this.rS.delete(id).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.dataSource = data; 
          this.updatePagedData();  
        });
      });
}
}
