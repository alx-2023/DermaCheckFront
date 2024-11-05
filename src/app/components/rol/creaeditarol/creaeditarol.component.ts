import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { Usuario } from '../../../models/Usuario';
import { RolService } from '../../../services/rol.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [ ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    MatButtonModule,
  CommonModule],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css'
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup  = new FormGroup({});
  Rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;

  listanombreRol: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'Usuario', viewValue: 'Usuario' },
    { value: 'Especialista', viewValue: 'Especialista' },
    { value: 'Empresas anunciantes', viewValue: 'Empresas anunciantes' },
  ];

  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder ,
    private rS: RolService ,
    private router: Router,
    private route: ActivatedRoute,
    private uS:UsuarioService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); //Inicializar el init
      this.isReadonly = true;
    }); 
    this.form = this.formBuilder.group({
      hnombreRol: ['', Validators .required],
      hcodigo: [''],
      huser: ['', Validators.required],
      });
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    
  }
  aceptar(): void {
    if (this.form.valid) {
      this.Rol.nombreRol = this.form.value.hnombreRol;
      this.Rol.idRol = this.form.value.hcodigo;
      this.Rol.user.idUsuario = this.form.value.huser;
      if (this.edicion) {
        this.rS.update(this.Rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.Rol).subscribe(() => {
          this.rS.list().subscribe((d) => {
            this.rS.setList(d);
          });
        });
      }
       
    }
    this.router.navigate(['roles']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRol),
          hnombreRol: new FormControl(data.nombreRol),
          huser: new FormControl(data.user.username)
        });
      });
    }
  }
}