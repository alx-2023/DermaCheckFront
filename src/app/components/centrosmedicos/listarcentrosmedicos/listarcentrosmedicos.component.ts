import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarcentrosmedicos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginator, MatIconModule, RouterModule],
  templateUrl: './listarcentrosmedicos.component.html',
  styleUrl: './listarcentrosmedicos.component.css',
})
export class ListarcentrosmedicosComponent implements OnInit {
  dataSource: CentrosMedicos[] = [];
  displayedColumns: string[] = [
    'Id',
    'Nombre',
    'Telefono',
    'Direccion',
    'Especialidades',
  ];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: CentrosMedicos[] = [];
  constructor(private cS: CentrosmedicosService) {}
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
