import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginator,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatSort,
  ],
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css'],
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'Username',
    'Nombres',
    'Apellidos',
    'Correo',
    'SitioWeb',
    'Cellphone',
    'NameCompany',
    'EsPremiun',
  ];
  showDetails: { [key: number]: boolean } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 2;
  currentPage = 0;
  pagedData: Usuario[] = [];

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort; 
      this.updatePagedData();
    });
  }

  filter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase(); 
  }

  updatePagedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  eliminar(id: number): void {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.dataSource.data = data;
        this.updatePagedData();
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.updatePagedData();
  }
}
