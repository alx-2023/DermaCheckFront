import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from '../../../models/Rol';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RolService } from '../../../services/rol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [ CommonModule,
    MatCardModule,
    MatPaginator,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatSort,],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string [] = ['Id', 'Name', 'UserId'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: Rol[] = [];
  constructor(private rS: RolService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.updatePagedData();
    });
    this.rS.list().subscribe((data) => {
      this.rS.setList(data);
    });
  }
  updatePagedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.dataSource.data.slice(startIndex, endIndex);  
  }
  
    onPageChange(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.updatePagedData();
    }
    eliminar(id: number): void {
      this.rS.delete(id).subscribe({
        next: () => {

          this.dataSource.data = this.dataSource.data.filter((rol) => rol.idRol !== id);
          this.updatePagedData(); 
    
          this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        },
        error: (err) => {

          if (err.status === 500) {
            this.snackBar.open(
              'No se puede eliminar porque este registro ya existe',
              'Cerrar',
              {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
              }
            );
          } else {
            this.snackBar.open(
              'Ocurrió un error al intentar eliminar el registro',
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
