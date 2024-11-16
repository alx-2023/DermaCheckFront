import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReporteCantidadCreditosComponent } from "./reporte-cantidad-creditos/reporte-cantidad-creditos.component";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReporteCantidadCreditosComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}
}
