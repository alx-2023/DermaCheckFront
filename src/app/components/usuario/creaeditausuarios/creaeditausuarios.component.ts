import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-creaeditausuarios',
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
  templateUrl: './creaeditausuarios.component.html',
  styleUrl: './creaeditausuarios.component.css',
})
export class CreaeditausuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;

  constructor(
    private uS: UsuarioService,
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
      husername: ['', Validators.required],
      hpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
      henabled: [true],
      hnombres: ['', Validators.required],
      hapellidos: ['', Validators.required],
      hcorreo: ['', [Validators.required, Validators.email]],
      hsitioWeb: [''],
      htelefono: ['', [Validators.required, Validators.pattern('^9\\d{8}$')]],
      hnombreEmpresa: [''],
      hesPremium: [''],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.hcodigo;
      this.usuario.username = this.form.value.husername;
      this.usuario.password = this.form.value.hpassword;
      this.usuario.enabled = this.form.value.henabled;
      this.usuario.nombres = this.form.value.hnombres;
      this.usuario.apellidos = this.form.value.hapellidos;
      this.usuario.correo = this.form.value.hcorreo;
      this.usuario.sitioWeb = this.form.value.hsitioWeb;
      this.usuario.telefono = this.form.value.htelefono;
      this.usuario.nombreEmpresa = this.form.value.hnombreEmpresa;
      this.usuario.esPremium = this.form.value.hesPremium;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((d) => {
            this.uS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUsuario),
          husername: new FormControl(data.username),
          hpassword: new FormControl(data.password),
          henabled: new FormControl(data.enabled),
          hnombres: new FormControl(data.nombres),
          hapellidos: new FormControl(data.apellidos),
          hcorreo: new FormControl(data.correo),
          hsitioWeb: new FormControl(data.sitioWeb),
          htelefono: new FormControl(data.telefono),
          hnombreEmpresa: new FormControl(data.nombreEmpresa),
          hesPremium: new FormControl(data.esPremium),
        });
      });
    }
  }
}
