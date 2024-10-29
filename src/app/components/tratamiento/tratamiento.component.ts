import { Component } from '@angular/core';
import { ListartratamientoComponent } from "./listartratamiento/listartratamiento.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tratamiento',
  standalone: true,
  imports: [RouterOutlet, ListartratamientoComponent],
  templateUrl: './tratamiento.component.html',
  styleUrl: './tratamiento.component.css'
})
export class TratamientoComponent {
  constructor(public route:ActivatedRoute){}

}
