import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListararticulosdermatologicosComponent } from './listararticulosdermatologicos/listararticulosdermatologicos.component';

@Component({
  selector: 'app-articulosdermatologicos',
  standalone: true,
  imports: [RouterOutlet, ListararticulosdermatologicosComponent],
  templateUrl: './articulosdermatologicos.component.html',
  styleUrl: './articulosdermatologicos.component.css'
})
export class ArticulosdermatologicosComponent {
  constructor(public route:ActivatedRoute){}
}
