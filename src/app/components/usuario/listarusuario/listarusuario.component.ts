import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource(); 
  displayedColumns: string[] = ['Id', 'Username', 'Nombres', 'Apellidos', 'Correo', 'SitioWeb', 'Cellphone', 'NameCompany', 'EsPremiun'];
  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }
}
