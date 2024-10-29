import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';

@Component({
  selector: 'app-listarcentrosmedicos',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarcentrosmedicos.component.html',
  styleUrl: './listarcentrosmedicos.component.css',
})
export class ListarcentrosmedicosComponent implements OnInit {
  dataSource: MatTableDataSource<CentrosMedicos> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Cellpone',
    'Address',
    'Specialties',
  ];
  constructor(private cS: CentrosmedicosService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
