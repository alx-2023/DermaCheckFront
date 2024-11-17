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
import { CRUDtrataComponent } from './components/tratamiento/crudtrata/crudtrata.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PlanesComponent } from './components/landing-page/planes/planes.component';
import { AcercaDeNosotrosComponent } from './components/landing-page/acerca-de-nosotros/acerca-de-nosotros.component';
import { TratamientoporfechaComponent } from './components/reportes/tratamientoporfecha/tratamientoporfecha.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { RegistrousuarioComponent } from './components/registrousuario/registrousuario.component';
import { CantidadEnfermedadesporUsuarioComponent } from './components/reportes/cantidad-enfermedadespor-usuario/cantidad-enfermedadespor-usuario.component';
import { ReportediagnosticoxusuarioComponent } from './components/reportes/reportediagnosticoxusuario/reportediagnosticoxusuario.component';
import { ReporteanuncioxusuarioComponent } from './components/reportes/reporteanuncioxusuario/reporteanuncioxusuario.component';
import { ReporteusuarioxanuncioComponent } from './components/reportes/reporteusuarioxanuncio/reporteusuarioxanuncio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
   

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
    canActivate: [seguridadGuard],
  },
  { path: 'LandingPage', component: LandingPageComponent ,
    children: [
      {
        path: 'Planes',
        component: PlanesComponent,
      },
      {
        path: 'AcercaDeNosotros',
        component: AcercaDeNosotrosComponent,
      },

       
    ],
  },
  {
    path: 'enfermedades',
    component: EnfermedadComponent,
    children: [
      {
        path: 'insertar',
        component: CreaeditaenfermedadComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaenfermedadComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  { path: 'enfermedades', component: EnfermedadComponent },
  {
    path: 'tratamientos',
    component: TratamientoComponent,
    children: [
      {
        path: 'registrar',
        component: CRUDtrataComponent,
      },
      {
        path: 'ediciones/:id',
        component: CRUDtrataComponent,
      },
      {
        path: 'reportes',
        component: TratamientoporfechaComponent,
      },
      
    ],
    canActivate: [seguridadGuard],
  },
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
      {
        path: 'reportes',
        component: ReporteusuarioxanuncioComponent
      },
      {
        path: 'reportes2',
        component: CantidadEnfermedadesporUsuarioComponent
      },
      {
        path: 'reportes3',
        component: ReportediagnosticoxusuarioComponent,
      },
       
       
    ],
    
    canActivate: [seguridadGuard],
  },
  {
    path: 'anuncios',
    component: AnuncioComponent,
    children: [
      { path: 'insertar', component: CreaeditaanuncioComponent },
      {
        path: 'ediciones/:id',
        component: CreaeditaanuncioComponent,
      },
      {
        path: 'reportes',
        component: ReporteanuncioxusuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'articulos-dermatologicos',
    component: ArticulosdermatologicosComponent,
    children: [
      {
        path: 'insertar',
        component: CreaeditaarticulosdermatologicosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaarticulosdermatologicosComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'recuperaciones',
    component: RecuperacionComponent,

    children: [
      {
        path: 'insertar',
        component: CreaeditarecuperacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarecuperacionComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'roles',
    component: RolComponent,
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
    canActivate: [seguridadGuard],
  },
  { path: 'diagnosticos', component: DiagnosticoComponent , children: [
    {
      path: 'reportes',
      component: ReportesComponent,
    },
  ],
  canActivate: [seguridadGuard],},

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
    canActivate: [seguridadGuard],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
    
  },

  {
    path: 'registrarse',
    component: RegistrousuarioComponent,
    
  },

];
