import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tratamiento } from '../../../models/Tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-crudtrata',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  templateUrl: './crudtrata.component.html',
  styleUrl: './crudtrata.component.css',
})
export class CRUDtrataComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tratamiento: Tratamiento = new Tratamiento();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tS: TratamientoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group(
      {
        hcodigo: [''],
        hnombre: ['', Validators.required],
        hdescripcion: ['', Validators.required],
        hmaterial: ['', Validators.required],
        hcomentario: ['', Validators.required],
        hfechaInicio: ['', Validators.required],
        hfechaFinal: ['', Validators.required],
        hestado: [false, Validators.requiredTrue], 
      },
      { validators: this.fechaValidator } 
    );

    
    this.form.get('hfechaInicio')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    });

    this.form.get('hfechaFinal')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    });
  }

  fechaValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const fechaInicio = group.get('hfechaInicio')?.value;
    const fechaFinal = group.get('hfechaFinal')?.value;

    
    if (fechaInicio && fechaFinal && new Date(fechaFinal) < new Date(fechaInicio)) {
      return { fechaInvalida: true };
    }
    return null; 
  };

  aceptar(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      this.form.markAllAsTouched(); 
      return;
    }

    
    this.tratamiento.idTratamiento = this.form.value.hcodigo;
    this.tratamiento.nombreTratamiento = this.form.value.hnombre;
    this.tratamiento.descripcionTratamiento = this.form.value.hdescripcion;
    this.tratamiento.materialMedicinal = this.form.value.hmaterial;
    this.tratamiento.comentario = this.form.value.hcomentario;
    this.tratamiento.fechaInicio = this.form.value.hfechaInicio;
    this.tratamiento.fechaFinal = this.form.value.hfechaFinal;
    this.tratamiento.estado = this.form.value.hestado;

    if (this.edicion) {
      this.tS.update(this.tratamiento).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
    } else {
      this.tS.insert(this.tratamiento).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
    }

    this.router.navigate(['tratamientos']);
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group(
          {
            hcodigo: [data.idTratamiento],
            hnombre: [data.nombreTratamiento, Validators.required],
            hmaterial: [data.materialMedicinal, Validators.required],
            hdescripcion: [data.descripcionTratamiento, Validators.required],
            hfechaInicio: [data.fechaInicio, Validators.required],
            hcomentario: [data.comentario, Validators.required],
            hestado: [data.estado, Validators.requiredTrue],
            hfechaFinal: [data.fechaFinal, Validators.required],
          },
          { validators: this.fechaValidator } 
        );
  
       
        this.form.updateValueAndValidity();
      });
    }
  }
  
}
