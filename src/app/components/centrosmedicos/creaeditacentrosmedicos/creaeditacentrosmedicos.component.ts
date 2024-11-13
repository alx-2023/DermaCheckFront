import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, 
         FormControl, 
         FormGroupDirective, 
         FormGroup, 
         NgForm, 
         ReactiveFormsModule, 
         Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditacentrosmedicos',
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
  templateUrl: './creaeditacentrosmedicos.component.html',
  styleUrl: './creaeditacentrosmedicos.component.css',
})

export class CreaeditacentrosmedicosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  CentrosMedicos:CentrosMedicos = new CentrosMedicos();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;

  constructor(
    private cS: CentrosmedicosService,
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
      hcodigo: [''],
      hnombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      htelefono: ['', [Validators.required, Validators.pattern("^[0-9]{9}$")]],
      hdireccion: ['', [Validators.required, Validators.maxLength(50)]],
      hespecialidades: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }  

  aceptar (): void {

    if (!this.form.valid) {
        this.snackBar.open('Por favor complete todos los campos obligatorios.', 'Cerrar', {
          duration: 3000,
        });
        return; 
      }

      this.CentrosMedicos.nombre = this.form.value.hnombre;
      this.CentrosMedicos.direccion = this.form.value.hdireccion;
      this.CentrosMedicos.telefono = this.form.value.htelefono;
      this.CentrosMedicos.especialidades = this.form.value.hespecialidades;
      this.CentrosMedicos.idCentroMedico = this.form.value.hcodigo;

      if (this.edicion) {
        this.cS.update(this.CentrosMedicos).subscribe((d) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
          this.snackBar.open('Centro Medico actualizado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      } else {
        this.cS.insert(this.CentrosMedicos).subscribe((d) => {
          this.cS.list().subscribe((d) => {
            this.cS.setList(d);
          });
          this.snackBar.open('Registro exitoso.', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    
    this.router.navigate(['centros-medicos']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        // En lugar de crear un nuevo FormGroup, actualizamos los valores existentes
        this.form.patchValue({
          hcodigo: data.idCentroMedico,
          hnombre: data.nombre,
          htelefono: data.telefono,
          hdireccion: data.direccion,
          hespecialidades: data.especialidades,
        });
      });
    }
  }
}
