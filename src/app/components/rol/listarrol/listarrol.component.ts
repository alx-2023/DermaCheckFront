import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginator, MatIconModule, RouterModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit {
  dataSource: Rol[] = [];
  displayedColumns: string [] = ['Id', 'Name', 'UserId'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 3;
  currentPage = 0;
  pagedData: Rol[] = [];
  constructor(private rS: RolService) {}
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
    onPageChange(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.updatePagedData();
    }
  
}
