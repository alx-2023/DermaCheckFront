import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de-nosotros',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrl: './acerca-de-nosotros.component.css'
})
export class AcercaDeNosotrosComponent {
  constructor(private router: Router) {}
  
  Planes() {
    this.router.navigate(['LandingPage/Planes']);
  }
  AcercadeNosotros() {
    this.router.navigate(['LandingPage/AcercaDeNosotros']);
  }
}
