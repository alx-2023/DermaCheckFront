import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, Form, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ArticulosDermatologicos } from '../../../models/ArticulosDermatologicos';
import { ArticulosdermatologicosService } from '../../../services/articulosdermatologicos.service';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creaeditaarticulosdermatologicos',
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
  templateUrl: './creaeditaarticulosdermatologicos.html',
  styleUrl: './creaeditaarticulosdermatologicos.css',
})

export class CreaeditaarticulosdermatologicosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  articuloDermatologico: ArticulosDermatologicos = new ArticulosDermatologicos();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;
  listaUsuarios: Usuario[] = [];

  constructor(
    private aS: ArticulosdermatologicosService,
    private formBuilder: FormBuilder,
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
        hcodigo: [''],
        hnombre: ['', Validators.required],
        htipo: ['', Validators.required],
        hdescripcion: ['', Validators.required],
        hurl: ['', Validators.required],
        hidUsuario: ['', Validators.required]
      });
      this.uS.list().subscribe(data=>{
        this.listaUsuarios=data
      })
  }

  aceptar (): void {
    if (this.form.valid) {
      this.articuloDermatologico.nombreRevista = this.form.value.hnombre;
      this.articuloDermatologico.tipoRevista = this.form.value.htipo;
      this.articuloDermatologico.descripcion = this.form.value.hdescripcion;
      this.articuloDermatologico.url = this.form.value.hurl;
      this.articuloDermatologico.usuario.idUsuario = this.form.value.hidUsuario;
      if (this.edicion) {
        this.aS.update(this.articuloDermatologico).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.articuloDermatologico).subscribe(() => {
          this.aS.list().subscribe((d) => {
            this.aS.setList(d);
          });
        });
      }
       
    }
    this.router.navigate(['articulosdermatologicos']);
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idArticulosDermatologico),
          hnombre: new FormControl(data.nombreRevista),
          htipo: new FormControl(data.tipoRevista),
          hdescripcion: new FormControl(data.descripcion),
          hurl: new FormControl(data.url),
          hidUsuario: new FormControl(data.usuario)
        });
      });
    }
  }
}
