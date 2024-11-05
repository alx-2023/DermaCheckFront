import { Routes } from '@angular/router';
import { CentrosmedicosComponent } from './components/centrosmedicos/centrosmedicos.component';
import { EnfermedadComponent } from './components/enfermedad/enfermedad.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { ArticulosdermatologicosComponent } from './components/articulosdermatologicos/articulosdermatologicos.component';
import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';
import { RolComponent } from './components/rol/rol.component';
import { DiagnosticoComponent } from './components/diagnostico/diagnostico.component';
import { DiagnosticoxtratamientoComponent } from './components/diagnosticoxtratamiento/diagnosticoxtratamiento.component';
import { CreaeditacentrosmedicosComponent } from './components/centrosmedicos/creaeditacentrosmedicos/creaeditacentrosmedicos.component';
import { LoginComponent } from './components/login/login.component';
import { CreaeditausuariosComponent } from './components/usuario/creaeditausuarios/creaeditausuarios.component';
import { CreaeditadiagnosticoxtratamientoComponent } from './components/diagnosticoxtratamiento/creaeditadiagnosticoxtratamiento/creaeditadiagnosticoxtratamiento.component';
import { CreaeditarolComponent } from './components/rol/creaeditarol/creaeditarol.component';
import { CreaeditarecuperacionComponent } from './components/recuperacion/creaeditarecuperacion/creaeditarecuperacion.component';
import { CreaeditaenfermedadComponent } from './components/enfermedad/creaeditaenfermedad/creaeditaenfermedad.component';
import { CreaeditaanuncioComponent } from './components/anuncio/creaeditaanuncio/creaeditaanuncio.component';
import { CreaeditaarticulosdermatologicosComponent } from './components/articulosdermatologicos/creaeditaarticulosdermatologicos/creaeditaarticulosdermatologicos';

export const routes: Routes = [
  {
    path: 'centros-medicos',component: CentrosmedicosComponent,
    children: [
      {
        path: 'insertar',component: CreaeditacentrosmedicosComponent,
      },
      {
        path: 'ediciones/:id',component: CreaeditacentrosmedicosComponent,
      },
    ],
  },
  { path: 'enfermedades', component: EnfermedadComponent, 
    children: 
    [
      {
        path: 'insertar',component: CreaeditaenfermedadComponent ,
      },
      {
        path: 'ediciones/:id',component: CreaeditaenfermedadComponent,
      },
    ],
  },
  { path: 'enfermedades', component: EnfermedadComponent },
  { path: 'tratamientos', component: TratamientoComponent },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'insertar',
        component: CreaeditausuariosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditausuariosComponent,
      },
    ],
  },
  { path: 'anuncios', component: AnuncioComponent,
    children: [
      {path: 'insertar',
        component: CreaeditaanuncioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaanuncioComponent,
      },
    ]
   },
  {
    path: 'articulos-dermatologicos',
    component: ArticulosdermatologicosComponent,
    children: [
      {path: 'insertar',
        component: CreaeditaarticulosdermatologicosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaarticulosdermatologicosComponent,
      },
    ]
  },
  { path: 'recuperaciones', component: RecuperacionComponent, 

    children: [
      {
        path: 'insertar',
        component:  CreaeditarecuperacionComponent ,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarecuperacionComponent,
      },
    ],
  },
  { path: 'roles', component: RolComponent,
    children: [
      {
        path: 'insertar',
        component: CreaeditarolComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarolComponent,
      },
    ],
   },
  { path: 'diagnosticos', component: DiagnosticoComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'diagnosticos-tratamientos',
    component: DiagnosticoxtratamientoComponent,
    children: [
      {
        path: 'insertar',
        component: CreaeditadiagnosticoxtratamientoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditadiagnosticoxtratamientoComponent,
      },
    ],
  },
];
