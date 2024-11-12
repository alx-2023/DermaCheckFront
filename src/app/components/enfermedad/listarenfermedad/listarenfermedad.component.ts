import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Enfermedad } from '../../../models/Enfermedad';
import { EnfermedadService } from '../../../services/enfermedad.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarenfermedad',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginator,
    MatIconModule,
    MatTableModule,
    RouterModule,
  ],
  templateUrl: './listarenfermedad.component.html',
  styleUrls: ['./listarenfermedad.component.css'],
})
export class ListarenfermedadComponent implements OnInit {
  dataSource: Enfermedad[] = [];

  displayedColumns: string[] = ['ID', 'c2', 'c3', 'c4', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: Enfermedad[] = [];

  constructor(private eS: EnfermedadService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      {
       this.dataSource = data;
      this.updatePagedData();
      }
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = data;
      this.updatePagedData();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.dataSource.slice(startIndex, endIndex);
  }

  eliminar(id: number): void {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.dataSource = data; 
        this.updatePagedData();  
      });
    });
  }
}