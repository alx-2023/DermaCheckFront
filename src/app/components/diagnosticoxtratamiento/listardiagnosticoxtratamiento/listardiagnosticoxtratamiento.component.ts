import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagnosticoxTratamiento } from '../../../models/DiagnosticoxTratamiento';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DiagnosticoxtratamientoService } from '../../../services/diagnosticoxtratamiento.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listardiagnosticoxtratamiento',
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
  templateUrl: './listardiagnosticoxtratamiento.component.html',
  styleUrl: './listardiagnosticoxtratamiento.component.css'
})
export class ListardiagnosticoxtratamientoComponent implements OnInit {
  dataSource: MatTableDataSource<DiagnosticoxTratamiento> = new MatTableDataSource();
  dataSource2 = new MatTableDataSource<DiagnosticoxTratamiento>([]); // Inicializado con una lista vacía
  mensajeSinRegistros = 'No hay recuperaciones registradas';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 2;
  currentPage = 0;
  pagedData: DiagnosticoxTratamiento[] = [];

  constructor(private dtS: DiagnosticoxtratamientoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dtS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      this.updatePagedData();
    });
    this.dtS.list().subscribe((data) => {
      this.dtS.setList(data);
    });
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
    this.dtS.delete(id).subscribe({
      next: () => {
        this.dtS.list().subscribe((data) => {
          this.dtS.setList(data);
          this.dataSource.data = data;
          this.updatePagedData();
        });
      },
      error: (err) => {
        if (err.status === 500) {
          this.snackBar.open(
            'No se puede eliminar porque este registro depende de otro',
            'Cerrar',
            {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            }
          );
        }
      },
    });
  }
}
