import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diagnostico } from '../../../models/Diagnostico';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';
import { InsertdiagnosticoComponent } from '../insertdiagnostico/insertdiagnostico.component';
import { InsertimageComponent } from '../insertimage/insertimage.component';
import { ListimageComponent } from '../listimage/listimage.component';
import { MatSort } from '@angular/material/sort';
import { CommonModule, NgForOf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-listardiagnostico',
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltip,
    MatPaginatorModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    RouterLink,
    MatDialogActions,
    MatDialogContent,
    RouterLink,
    MatSort,
    NgForOf,
    MatCardModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './listardiagnostico.component.html',
  styleUrl: './listardiagnostico.component.css',
})
export class ListardiagnosticoComponent implements OnInit {
  dataSource: MatTableDataSource<Diagnostico> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'DateDiagnostic',
    'Punctuation',
    'UserId',
    'Enfermedad',
    'CentroMedico',
    'imagenes',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 3;
  currentPage = 0;
  pagedData: Diagnostico[] = [];

  constructor(private dS: DiagnosticoService, private snackBar: MatSnackBar,public matdialog: MatDialog) {}
  ngOnInit(): void {
    this.dS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.updatePagedData();
    });

    this.dS.list().subscribe((data) => {
      this.dS.setList(data);
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
    this.snackBar.open(
      'No se puede eliminar este registro porque está relacionado con otra tabla',
      'Cerrar',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      }
    );
  }

  /*aIMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGEEEEEEEEEEEEEEEEEEEEEEEEEN*/
  OpenModalInsert() {
    this.matdialog.open(InsertdiagnosticoComponent, {
      data: { id: 0 },
      width: '60%',
      height: '75%',
    });
  }
  // ALL PRODUCT
  Update(idUpdate: number) {
    this.matdialog.open(InsertdiagnosticoComponent, {
      data: { id: idUpdate },
      width: '60%',
      height: '75%',
    });
  }
  deletee(idDelte: number) {
    this.dS.delete(idDelte).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
  // TODO DE IMAGENES
  InsertImage(idProd: number) {
    this.matdialog.open(InsertimageComponent, {
      data: { id: idProd, edit: false },
      width: '70%',
      height: '75%',
    });
  }
  EditImage(idProd: number) {
    this.matdialog.open(InsertimageComponent, {
      data: { id: idProd, edit: true },
      width: '70%',
      height: '75%',
    });
  }
  ViewImage(idProd: number) {
    this.matdialog.open(InsertimageComponent, {
      data: { id: idProd },
      width: '50%',
      height: '90%',
    });
  }
}
