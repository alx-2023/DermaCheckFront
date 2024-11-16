import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css',
})
export class PlanesComponent {
  constructor(private router: Router) {}

  Planes() {
    this.router.navigate(['LandingPage/Planes']);
  }
  AcercadeNosotros() {
    this.router.navigate(['LandingPage/AcercaDeNosotros']);
  }
}
