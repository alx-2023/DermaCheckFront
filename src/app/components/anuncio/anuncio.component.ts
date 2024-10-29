import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaranuncioComponent } from "./listaranuncio/listaranuncio.component";

@Component({
  selector: 'app-anuncio',
  standalone: true,
  imports: [RouterOutlet, ListaranuncioComponent],
  templateUrl: './anuncio.component.html',
  styleUrl: './anuncio.component.css'
})
export class AnuncioComponent {
  constructor(public route:ActivatedRoute) {}
}
