import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecuperacionComponent } from './listarrecuperacion/listarrecuperacion.component';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [RouterOutlet, ListarrecuperacionComponent],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  constructor(public route:ActivatedRoute){}
}

