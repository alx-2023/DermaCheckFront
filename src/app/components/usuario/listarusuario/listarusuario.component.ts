import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginator],
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css']
})
export class ListarusuarioComponent implements OnInit {
  dataSource: Usuario[] = [];
  displayedColumns: string[] = ['Id', 'Username', 'Nombres', 'Apellidos', 'Correo', 'SitioWeb', 'Cellphone', 'NameCompany', 'EsPremiun'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: Usuario[] = [];

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = data;
      this.updatePagedData();
    });
    this.uS.getList().subscribe(data => {
      this.dataSource = data;
      this.updatePagedData();

    })
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
}
