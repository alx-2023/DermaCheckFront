import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/Rol';

@Component({
  selector: 'app-registrousuario',
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
    MatIcon
  ],
  templateUrl: './registrousuario.component.html',
  styleUrl: './registrousuario.component.css'
})
export class RegistrousuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;
  hidePassword: boolean = true;
  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private rS: RolService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // Inicializar el init
      this.isReadonly = true;
      this.rol.nombreRol = "Cliente";
      this.rol.idRol = this.id;

    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      husername: ['', Validators.required],
      hpassword: ['', [Validators.required, Validators.minLength(8)]],
      henabled: [true],
      hnombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      hapellidos: ['', [Validators.required,  Validators.minLength(2), Validators.maxLength(20)]],
      hcorreo: ['', [Validators.required, Validators.email]],
      hsitioWeb: [''],
      htelefono: ['', [Validators.required, Validators.pattern('^9\\d{8}$')]],
      hnombreEmpresa: ['', Validators.maxLength(30)],
      hesPremium: [''],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  aceptar(): void {
    if (!this.form.valid) {
      this.snackBar.open('Por favor complete todos los campos obligatorios.', 'Cerrar', {
        duration: 3000,
      });
      return; 
    }
  
    const username = this.form.value.husername;
    
    this.uS.checkUsernameExists(username).subscribe((exists) => {
      if (exists) {
        this.snackBar.open('El nombre de usuario ya está en uso. Por favor elija otro.', 'Cerrar', {
          duration: 3000,
        });
        return; 
      }
  
    
      this.usuario.idUsuario = this.form.value.hcodigo;
      this.usuario.username = username;
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
          this.snackBar.open('Usuario actualizado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((d) => {
            this.uS.setList(d);
          });
          this.snackBar.open('Te has registrado.', 'Cerrar', {
            duration: 3000,
          });
        });
        this.rS.insert(this.rol).subscribe((d) => {
          this.rS.list().subscribe((d) => {
            this.rS.setList(d);
            this.snackBar.open('Rol asignado correctamente', 'Cerrar', {
              duration: 3000,
            })
          });
        });
        this.router.navigate(['login']);
        
      }
  
    });
  }
  

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idUsuario,
          husername: data.username,
          hpassword: data.password,
          henabled: data.enabled,
          hnombres: data.nombres,
          hapellidos: data.apellidos,
          hcorreo: data.correo,
          hsitioWeb: data.sitioWeb,
          htelefono: data.telefono,
          hnombreEmpresa: data.nombreEmpresa,
          hesPremium: data.esPremium,
        });
      });
    }
  }
  

}