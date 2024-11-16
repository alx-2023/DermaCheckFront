import { Component } from '@angular/core';
import { DiagmaximopuntuacionComponent } from "./diagmaximopuntuacion/diagmaximopuntuacion.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [DiagmaximopuntuacionComponent, RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}

}
