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

export const routes: Routes = [
  {
    path: 'centros-medicos',
    component: CentrosmedicosComponent,
    children: [
      {
        path: 'insertar',
        component: CreaeditacentrosmedicosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditacentrosmedicosComponent,
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
  { path: 'anuncios', component: AnuncioComponent },
  {
    path: 'articulos-dermatologicos',
    component: ArticulosdermatologicosComponent,
  },
  { path: 'recuperaciones', component: RecuperacionComponent },
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
    ],
  },
];
