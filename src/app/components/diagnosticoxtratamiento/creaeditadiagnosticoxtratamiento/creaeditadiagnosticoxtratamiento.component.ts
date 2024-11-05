import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Diagnostico } from '../../../models/Diagnostico';
import { DiagnosticoxTratamiento } from '../../../models/DiagnosticoxTratamiento';
import { Tratamiento } from '../../../models/Tratamiento';
import { DiagnosticoxtratamientoService } from '../../../services/diagnosticoxtratamiento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { TratamientoService } from '../../../services/tratamiento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditadiagnosticoxtratamiento',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditadiagnosticoxtratamiento.component.html',
  styleUrl: './creaeditadiagnosticoxtratamiento.component.css',
})
export class CreaeditadiagnosticoxtratamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  diagXTrat: DiagnosticoxTratamiento = new DiagnosticoxTratamiento();

  listaDiagnosticos: Diagnostico[] = [];
  listaTratamientos: Tratamiento[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private tS: TratamientoService,
    private dS: DiagnosticoService,
    private dtS: DiagnosticoxtratamientoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hidDiagnostico: ['', Validators.required],
      hidTratamiento: ['', Validators.required],
    });
    this.dS.list().subscribe((data) => {
      this.listaDiagnosticos = data;
    });
    this.tS.list().subscribe((data) => {
      this.listaTratamientos = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.diagXTrat.diagnostico.idDiagnostico = this.form.value.hidDiagnostico;
      this.diagXTrat.tratamiento.idTratamiento = this.form.value.hidTratamiento;
      

      this.dtS.insert(this.diagXTrat).subscribe((data) => {
        this.dtS.list().subscribe((data) => {
          this.dtS.setList(data);
        });
      });
      this.router.navigate(['diagnosticos-tratamientos']);
    }
  }

}
