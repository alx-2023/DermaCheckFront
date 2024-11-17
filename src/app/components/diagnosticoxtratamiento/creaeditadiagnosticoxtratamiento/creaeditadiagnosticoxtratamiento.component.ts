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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;


  listaDiagnosticos: Diagnostico[] = [];
  listaTratamientos: Tratamiento[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private tS: TratamientoService,
    private dS: DiagnosticoService,
    private dtS: DiagnosticoxtratamientoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.isReadonly = true;
    });
    this.form = this.formBuilder.group({
      hidDiagxTrat: [''],  
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
    if (!this.form.valid) {
      this.snackBar.open('Por favor complete todos los campos obligatorios.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

      this.diagXTrat.diagnostico.idDiagnostico = this.form.value.hidDiagnostico;
      this.diagXTrat.tratamiento.idTratamiento = this.form.value.hidTratamiento;
      
      if (this.edicion) {
        this.dtS.update(this.diagXTrat).subscribe(() => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
          this.snackBar.open('Registro actualizado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      }
      else {
        this.dtS.insert(this.diagXTrat).subscribe((data) => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
        });
        this.router.navigate(['diagnosticos-tratamientos']);
      }
    }
    init() {
      if (this.edicion) {
        this.dtS.listId(this.id).subscribe((data) => {
          this.form.patchValue({
            hidDiagxTrat: data.idDiagnosticoxTratamiento,
            hidDiagnostico: data.diagnostico.idDiagnostico,
            hidTratamiento: data.tratamiento.idTratamiento,
          });
        });
      }
    }
  }
