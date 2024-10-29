import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcentrosmedicosComponent } from "./listarcentrosmedicos/listarcentrosmedicos.component";
import { CreaeditacentrosmedicosComponent } from "./creaeditacentrosmedicos/creaeditacentrosmedicos.component";

@Component({
  selector: 'app-centrosmedicos',
  standalone: true,
  imports: [RouterOutlet, ListarcentrosmedicosComponent, CreaeditacentrosmedicosComponent],
  templateUrl: './centrosmedicos.component.html',
  styleUrl: './centrosmedicos.component.css'
})
export class CentrosmedicosComponent {
  constructor(public route:ActivatedRoute) {}
}
