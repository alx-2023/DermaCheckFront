import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); //Inicializar el init
      this.isReadonly = true;
    }); 
    
      this.form = this.formBuilder.group({
        hcodigo: [''],
        hnombre: ['', Validators.required],
        htelefono: ['', Validators.required],
        hdireccion: ['', Validators.required],
        hespecialidades: ['', Validators.required],
      });
  }

  aceptar (): void {
    if (this.form.valid) {
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
        });
      } else {
        this.cS.insert(this.CentrosMedicos).subscribe((d) => {
          this.cS.list().subscribe((d) => {
            this.cS.setList(d);
             
          });
        });
      }
       
    }
    this.router.navigate(['centros-medicos']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCentroMedico),
          hnombre: new FormControl(data.nombre),
          htelefono: new FormControl(data.telefono),
          hdireccion: new FormControl(data.direccion),
          hespecialidades: new FormControl(data.especialidades),
        });
      });
    }
  }
}
