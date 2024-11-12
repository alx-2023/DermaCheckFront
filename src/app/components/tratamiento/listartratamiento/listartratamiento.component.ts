import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Tratamiento } from '../../../models/Tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { MatCardModule } from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listartratamiento',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    NgForOf,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listartratamiento.component.html',
  styleUrls: ['./listartratamiento.component.css'],
})
export class ListartratamientoComponent implements OnInit {
  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id', 'Name', 'Description', 'Material', 'Comment', 'DateStart', 'DateEnd', 'State', 'update'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TratamientoService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number): void {
    this.tS.delete(id).subscribe(() => {
      this.tS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
