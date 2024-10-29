import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardiagnosticoComponent } from './listardiagnostico/listardiagnostico.component';

@Component({
  selector: 'app-diagnostico',
  standalone: true,
  imports: [RouterOutlet, ListardiagnosticoComponent],
  templateUrl: './diagnostico.component.html',
  styleUrl: './diagnostico.component.css'
})
export class DiagnosticoComponent {
  constructor(public route:ActivatedRoute) {}
}
