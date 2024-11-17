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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaanuncio',
  providers: [provideNativeDateAdapter()],
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
    private snackBar: MatSnackBar,
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
      hcredito: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      hingresos: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      hduracion: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      hidUsuario: ['', Validators.required]
    });
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  };

  aceptar (): void {
    if (this.form.valid) {
      this.Anuncio.idAnuncio = this.form.value.hcodigo;
      this.Anuncio.url = this.form.value.hurl;
      this.Anuncio.descripcion = this.form.value.hdescripcion;
      this.Anuncio.creditos = this.form.value.hcredito;
      this.Anuncio.ingresosPorAnuncioSoles = this.form.value.hingresos;
      this.Anuncio.duracionMinutos = this.form.value.hduracion;
      this.Anuncio.usuario.idUsuario = this.form.value.hidUsuario;
      if (this.edicion) {
        this.cS.update(this.Anuncio).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.router.navigate(['anuncios']);
          });
          this.snackBar.open('Anuncio actualizado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      } else {
        this.cS.insert(this.Anuncio).subscribe(() => {
          this.cS.list().subscribe((d) => {
            this.cS.setList(d);
            
          });
          
          this.snackBar.open('Anuncio registrado correctamente', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    } else {
      this.snackBar.open('Error al registrar. Por favor, revise todos los campos.', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }

  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idAnuncio,
          hurl: data.url,
          hdescripcion: data.descripcion,
          hcredito: data.creditos,
          hingresos: data.ingresosPorAnuncioSoles,
          hduracion: data.duracionMinutos,
          hidUsuario: data.usuario.idUsuario
        });
      });
    }
  }
}
