import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Tratamiento } from '../../../models/Tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    CommonModule,
    MatSort,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './listartratamiento.component.html',
  styleUrls: ['./listartratamiento.component.css'],
})
export class ListartratamientoComponent implements OnInit {
  dataSource: Tratamiento[]=[];
  displayedColumns: string[] = [
    'Id', 'Name', 'Description', 'Material', 'Comment', 'DateStart', 'DateEnd', 'State', 'update'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 3;
  currentPage = 0;
  pagedData: Tratamiento[] = [];
  constructor(private tS: TratamientoService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource =data
      this.updatePagedData();
    });
    this.tS.getList().subscribe((data)=>{
      this.dataSource = data;
      this.updatePagedData();
    })
  }
  filter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase(); 
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

  delete(id: number): void {
    this.tS.delete(id).subscribe(() => {
      this.tS.list().subscribe((data) => {
        this.dataSource = data;
        this.updatePagedData();  
      });
    });
  }
}
