import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Enfermedad } from '../../../models/Enfermedad';
import { EnfermedadService } from '../../../services/enfermedad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaenfermedad',
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
  ],
  templateUrl: './creaeditaenfermedad.component.html',
  styleUrls: ['./creaeditaenfermedad.component.css'],
})
export class CreaeditaenfermedadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  enfermedad: Enfermedad = new Enfermedad();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;

  constructor(
    private eS: EnfermedadService,
    private formBuilder: FormBuilder,
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
      idEnfermedad: [''],
      nombreEnfermedad: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)], 
      [this.nombreUnicoValidator.bind(this)]], // Validación de repetidos
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      sintomas:    ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  aceptar(): void {
    if (!this.form.valid) {
      this.snackBar.open('Por favor complete todos los campos obligatorios.', 'Cerrar', {
        duration: 3000,
      });
      return; 
    }
      this.enfermedad.idEnfermedad = this.form.value.idEnfermedad;
      this.enfermedad.nombreEnfermedad = this.form.value.nombreEnfermedad;
      this.enfermedad.descripcion = this.form.value.descripcion;
      this.enfermedad.sintomas = this.form.value.sintomas;

      if (this.edicion) {
        this.eS.update(this.enfermedad).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
          this.snackBar.open('Enfermedad actualizado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      } else {
        this.eS.insert(this.enfermedad).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
          this.snackBar.open('Registro exitoso.', 'Cerrar', {
            duration: 3000,
          });
        });
      }

    this.router.navigate(['enfermedades']);
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idEnfermedad: data.idEnfermedad,
          nombreEnfermedad: data.nombreEnfermedad,
          descripcion: data.descripcion,
          sintomas: data.sintomas,
        });
      });
    }
  }
  

  nombreUnicoValidator(control: FormControl) {
    const nombre = control.value;
    
    return new Promise(resolve => {
      if (!nombre) {
        resolve(null); // Si no hay nombre, no valida
      } else {
        this.eS.list().subscribe(data => {
          const enfermedadExistente = data.find(e => 
            e.nombreEnfermedad === nombre && (!this.edicion || e.idEnfermedad !== this.id)
          );
          resolve(enfermedadExistente ? { nombreUnico: true } : null);
        });
      }
    });
  }
  
}
