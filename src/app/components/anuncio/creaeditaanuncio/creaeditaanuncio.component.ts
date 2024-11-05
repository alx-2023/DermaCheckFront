import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Anuncio } from '../../../models/Anuncio';
import { AnuncioService } from '../../../services/anuncio.service';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creaeditaanuncio',
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
  templateUrl: './creaeditaanuncio.component.html',
  styleUrl: './creaeditaanuncio.component.css',
})

export class CreaeditaanuncioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Anuncio:Anuncio = new Anuncio();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;
  listaUsuarios: Usuario[] = [];

  constructor(
    private cS: AnuncioService,
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
        hurl: ['', Validators.required],
        hdescripcion: ['', Validators.required],
        hcredito: ['', Validators.required],
        hingresos: ['', Validators.required],
        hduracion: ['', Validators.required],
        hidUsuario: ['', Validators.required]
      });
      this.uS.list().subscribe(data=>{
        this.listaUsuarios=data
      })
  }

  aceptar (): void {
    if (this.form.valid) {
      this.Anuncio.url = this.form.value.hurl;
      this.Anuncio.descripcion = this.form.value.hdescripcion;
      this.Anuncio.creditos = this.form.value.hcredito;
      this.Anuncio.ingresosPorAnuncioSoles = this.form.value.hingresos;
      this.Anuncio.duracionMinutos = this.form.value.hduracion;
      this.Anuncio.usuario.idUsuario = this.form.value.hidUsuario;
      if (this.edicion) {
        this.cS.update(this.Anuncio).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.Anuncio).subscribe(() => {
          this.cS.list().subscribe((d) => {
            this.cS.setList(d);
          });
        });
      }
       
    }
    this.router.navigate(['anuncio']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idAnuncio),
          hurl: new FormControl(data.url),
          hdescripcion: new FormControl(data.descripcion),
          hcredito: new FormControl(data.creditos),
          hingresos: new FormControl(data.ingresosPorAnuncioSoles),
          hduracion: new FormControl(data.duracionMinutos),
          hidUsuario: new FormControl(data.usuario)
        });
      });
    }
  }
}
