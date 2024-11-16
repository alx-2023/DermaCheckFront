import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlanesComponent } from "./planes/planes.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, PlanesComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(public route:ActivatedRoute) {}
}
