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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init()
      this.isReadonly = true;
    }); 

    this.form = this.formBuilder.group({
      idEnfermedad: [''],
      nombreEnfermedad: ['', Validators.required],
      descripcion: ['', Validators.required],
      sintomas: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.enfermedad.idEnfermedad = this.form.value.idEnfermedad;
      this.enfermedad.nombreEnfermedad = this.form.value.nombreEnfermedad;
      this.enfermedad.descripcion = this.form.value.descripcion;
      this.enfermedad.sintomas = this.form.value.sintomas;
      if (this.edicion) {
        this.eS.update(this.enfermedad).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.enfermedad).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      
    }
    this.router.navigate(['enfermedades']);
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idEnfermedad: new FormControl(data.idEnfermedad),
          nombreEnfermedad: new FormControl(data.nombreEnfermedad),
          descripcion: new FormControl(data.descripcion),
          sintomas: new FormControl(data.sintomas),
        });
      });
    }
  }
}
