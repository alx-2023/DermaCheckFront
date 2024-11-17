import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Diagnostico } from '../../../models/Diagnostico';
import { Enfermedad } from '../../../models/Enfermedad';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { Usuario } from '../../../models/Usuario';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { EnfermedadService } from '../../../services/enfermedad.service';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insertdiagnostico',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatSelectModule,
    MatDatepickerModule

  ],
  templateUrl: './insertdiagnostico.component.html',
  styleUrl: './insertdiagnostico.component.css',
})
export class InsertdiagnosticoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  diagnostico: Diagnostico = new Diagnostico();
  edicion: boolean = false;
  id: number = 0;
  titulo: string = 'Registrar';
  existe: boolean = false;
  isReadonly: boolean = false;
  enfermedades: Enfermedad[] = [];
  centros: CentrosMedicos[] = [];
  usuario: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private dS: DiagnosticoService,
    private eS: EnfermedadService,
    private cS: CentrosmedicosService,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id =  data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.isReadonly = true;
    });
    this.form = this.fb.group({
      hidDiagnostico: ['',],
      hfechaDiagnostico: ['', Validators.required],
      hpuntuacion: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      henfermedad: ['', Validators.required],
      husuario: ['', Validators.required],
      hcentrosMedicos: ['', Validators.required],
    });

    this.eS.list().subscribe((data) => {
      this.enfermedades = data;
    });
    this.cS.list().subscribe((data) => {
      this.centros = data;
    });
    this.uS.list().subscribe((data) => {
      this.usuario = data;
    });
  }

  register(): void {
    if (this.form.valid) {
      this.diagnostico.idDiagnostico = this.form.value.hidDiagnostico;
      this.diagnostico.fechaDiagnostico = this.form.value.hfechaDiagnostico;
      this.diagnostico.puntuacion = this.form.value.hpuntuacion;
      this.diagnostico.enfermedad.idEnfermedad = this.form.value.henfermedad;
      this.diagnostico.usuario.idUsuario = this.form.value.husuario;
      this.diagnostico.centrosMedicos.idCentroMedico = this.form.value.hcentrosMedicos;

      if (this.edicion) {
        this.dS.update(this.diagnostico).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      } else {
        this.dS.insert(this.diagnostico).subscribe((d) => {
          this.dS.list().subscribe((d) => {
            this.dS.setList(d);
            this.snackBar.open('Diagnóstico registrado correctamente', 'Cerrar', {
              duration: 3000,
            }).afterOpened().subscribe(() => {
              this.form.reset();
            });
            setTimeout(() => {
              window.location.reload();
            }, 1600);
          });
        });
      }
      this.mostrarMensaje('Se registro correctamente el diagnostico');
     
    } else {
      this.mostrarMensaje('El nombre del diagnostico ya existe, eliga otro');
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = this.fb.group({
          hidDiagnostico: new FormControl(data.idDiagnostico),
          hfechaDiagnostico: new FormControl(data.fechaDiagnostico),
          hpuntuacion: new FormControl(data.puntuacion),
          henfermedad: new FormControl(data.enfermedad.idEnfermedad),
          husuario: new FormControl(data.usuario.idUsuario),
          hcentrosMedicos: new FormControl(data.centrosMedicos.idCentroMedico),
        });
      });
    }
  }

  mostrarMensaje(ms: string) {
    let mensaje = ms;
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
