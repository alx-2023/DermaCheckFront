import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Recuperacion } from '../../../models/Recuperacion';
import { Usuario } from '../../../models/Usuario';
import { RecuperacionService } from '../../../services/recuperacion.service';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
 
@Component({
  selector: 'app-creaeditarecuperacion',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatFormFieldModule ,
     
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
],
  templateUrl: './creaeditarecuperacion.component.html',
  styleUrl: './creaeditarecuperacion.component.css'
})
export class CreaeditarecuperacionComponent implements OnInit{
  form: FormGroup   = new FormGroup({});
  Recuperacion: Recuperacion = new Recuperacion();
  id: number = 0;
  edicion: boolean = false;
  isReadonly: boolean = false;

 
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder  ,
    private rS: RecuperacionService ,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private uS:UsuarioService
  ) {}
  
  ngOnInit(): void  {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); //Inicializar el init
      this.isReadonly = true;
    }); 
    this.form = this.formBuilder.group({
      hcodigorecuperacion: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      hidRecuperacion: [''],
      hfechaexpiracion: ['', Validators  .required],
      hfechasolicitud: ['', Validators  .required],
      hUsuario: ['', Validators.required],
      hstate: [true],
    },
    { validators: this.fechaValidator } 
  );

    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    this.form.get('hfechasolicitud')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    });

    this.form.get('hfechaexpiracion')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    });
  }
  
  fechaValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const fechaInicio = group.get('hfechasolicitud')?.value;
    const fechaFinal = group.get('hfechaexpiracion')?.value;

    
    if (fechaInicio && fechaFinal && new Date(fechaFinal) < new Date(fechaInicio)) {
      return { fechaInvalida: true };
    }
    return null; 
  };
  aceptar(): void {
    if (this.form.valid) {
      this.Recuperacion.idRecuperacion = this.form.value.hidRecuperacion;
      this.Recuperacion.codigoRecuperacion = this.form.value.hcodigorecuperacion;
      this.Recuperacion.estadoRecuperacion = this.form.value.hstate;
      this.Recuperacion.fechaExpiracion = this.form.value.hfechaexpiracion ;
      this.Recuperacion.fechaSolicitud = this.form.value.hfechasolicitud;
      this.Recuperacion.usuario.idUsuario = this.form.value.hUsuario;
      if (this.edicion) {
        this.rS.update(this.Recuperacion).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.snackBar.open('Recuperación actualizada correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['recuperaciones']);
          });
        });
      } else {
        this.rS.insert(this.Recuperacion).subscribe(() => {
          this.rS.list().subscribe((d) => {         
             
            
            this.snackBar.open('Recuperación registrada correctamente', 'Cerrar', {
              duration: 3000,
            }).afterOpened().subscribe(() => {
              this.form.reset();
            });
      
            
            setTimeout(() => {
              window.location.reload();
            }, 1600);
            })
                      

       });
      
      }
       
    }
    else{
        this.snackBar.open('Error al registrar. Por favor, revise todos los campos.', 'Cerrar', {
          duration: 3000,  
          panelClass: ['error-snackbar']  
        });

    }
    this.router.navigate(['recuperaciones/insertar']);
     
  }

  
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidRecuperacion: new FormControl(data.idRecuperacion),
          hcodigorecuperacion: new FormControl(data.codigoRecuperacion),
          hstate: new FormControl(data.estadoRecuperacion),
          hfechaexpiracion: new FormControl(data.fechaExpiracion),
          hfechasolicitud: new FormControl(data.fechaSolicitud),
          hUsuario: new FormControl(data.usuario.idUsuario)
        }, { validators: this.fechaValidator });
      });
    }
  }
  
}
