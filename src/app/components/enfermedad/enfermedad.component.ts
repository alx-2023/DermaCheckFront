import { Component } from '@angular/core';
import { Enfermedad } from '../../models/Enfermedad';
import { MatTableDataSource } from '@angular/material/table';
import { EnfermedadService } from '../../services/enfermedad.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarenfermedadComponent } from "./listarenfermedad/listarenfermedad.component";

@Component({
  selector: 'app-enfermedad',
  standalone: true,
  imports: [RouterOutlet, ListarenfermedadComponent],
  templateUrl: './enfermedad.component.html',
  styleUrl: './enfermedad.component.css'
})
export class EnfermedadComponent {
  constructor(public route:ActivatedRoute) {}
}
