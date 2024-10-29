import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../../../models/Anuncio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AnuncioService } from '../../../services/anuncio.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-listaranuncio',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule], 
  templateUrl: './listaranuncio.component.html',
  styleUrl: './listaranuncio.component.css',
})
export class ListaranuncioComponent implements OnInit {
  dataSource: MatTableDataSource<Anuncio> = new MatTableDataSource(); 
  displayedColumns: string[] = ['Id', 'Url', 'Description', 'Credits', 'Gains', 'Duration'];

  constructor(private aS: AnuncioService) {}

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
