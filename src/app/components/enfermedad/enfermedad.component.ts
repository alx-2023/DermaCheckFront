import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarenfermedadComponent } from "./listarenfermedad/listarenfermedad.component";
import { CreaeditaenfermedadComponent } from './creaeditaenfermedad/creaeditaenfermedad.component';

@Component({
  selector: 'app-enfermedad',
  standalone: true,
  imports: [RouterOutlet, ListarenfermedadComponent, CreaeditaenfermedadComponent],
  templateUrl: './enfermedad.component.html',
  styleUrl: './enfermedad.component.css'
})
export class EnfermedadComponent {
  constructor(public route:ActivatedRoute) {}
}
