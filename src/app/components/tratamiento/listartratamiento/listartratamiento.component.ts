import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tratamiento } from '../../../models/Tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';

@Component({
  selector: 'app-listartratamiento',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listartratamiento.component.html',
  styleUrl: './listartratamiento.component.css'
})
export class ListartratamientoComponent implements OnInit {
  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource(); 
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'Material', 'Comment', 'DateStart', 'DateEnd', 'State'];
  constructor(private tS: TratamientoService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}
