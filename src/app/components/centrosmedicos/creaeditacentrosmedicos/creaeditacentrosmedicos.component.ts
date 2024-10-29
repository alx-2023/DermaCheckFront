import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creaeditacentrosmedicos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './creaeditacentrosmedicos.component.html',
  styleUrl: './creaeditacentrosmedicos.component.css',
})

export class CreaeditacentrosmedicosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  centroMedico: CentrosMedicos = new CentrosMedicos();


  constructor(
    private cS: CentrosmedicosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        hnombre: ['', Validators.required],
        htelefono: ['', Validators.required],
        hdireccion: ['', Validators.required],
        hespecialidades: ['', Validators.required],
      })
  }

  aceptar (): void {
    if (this.form.valid) {
      this.centroMedico.nombre = this.form.value.hnombre;
      this.centroMedico.direccion = this.form.value.hdireccion;
      this.centroMedico.telefono = this.form.value.htelefono;
      this.centroMedico.especialidades = this.form.value.hespecialidades;
      this.cS.insert(this.centroMedico).subscribe(() => {
        this.cS.list().subscribe((d) => {
          this.cS.setList(d);
        })
      })
    }
    this.router.navigate(['centros-medicos']);
  }
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

}
