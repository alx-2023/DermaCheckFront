import { Component, OnInit } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string [] = ['Id', 'Name', 'UserId'];
  constructor(private rS: RolService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}
