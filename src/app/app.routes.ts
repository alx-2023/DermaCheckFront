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

export const routes: Routes = [
  {
    path: 'centros-medicos',
    component: CentrosmedicosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditacentrosmedicosComponent,
      },
    ],
  },
  { path: 'enfermedades', component: EnfermedadComponent },
  { path: 'tratamientos', component: TratamientoComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'anuncios', component: AnuncioComponent },
  {
    path: 'articulos-dermatologicos',
    component: ArticulosdermatologicosComponent,
  },
  { path: 'recuperaciones', component: RecuperacionComponent },
  { path: 'roles', component: RolComponent },
  { path: 'diagnosticos', component: DiagnosticoComponent },
  {
    path: 'diagnosticos-tratamientos',
    component: DiagnosticoxtratamientoComponent,
  },
];
