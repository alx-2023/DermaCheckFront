import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardiagnosticoxtratamientoComponent } from './listardiagnosticoxtratamiento/listardiagnosticoxtratamiento.component';

@Component({
  selector: 'app-diagnosticoxtratamiento',
  standalone: true,
  imports: [RouterOutlet, ListardiagnosticoxtratamientoComponent],
  templateUrl: './diagnosticoxtratamiento.component.html',
  styleUrl: './diagnosticoxtratamiento.component.css'
})
export class DiagnosticoxtratamientoComponent {
  constructor(public route:ActivatedRoute) {}
}
