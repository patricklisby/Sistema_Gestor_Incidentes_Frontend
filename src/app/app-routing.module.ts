import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VerIncidenciasComponent } from './ver-incidencias/ver-incidencias.component';
import { VerIncidenciasCompletaComponent } from './ver-incidencias-completa/ver-incidencias-completa.component';
import { RegistrarIncidenciasComponent } from './registrar-incidencias/registrar-incidencias.component';
import { RegistrarDiagnosticosComponent } from './registrar-diagnosticos/registrar-diagnosticos.component';
import { VerDiagnosticosComponent } from './ver-diagnosticos/ver-diagnosticos.component';
import { AsignarIncidenciasComponent } from './asignar-incidencias/asignar-incidencias.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ReporteCargaPorTrabajoComponent } from './reporte-carga-por-trabajo/reporte-carga-por-trabajo.component';
import { EditarIncidenciaComponent } from './editar-incidencia/editar-incidencia.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'ver_incidencias',
    component: VerIncidenciasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ver_incidencias/:cn_id_usuario',
    component: VerIncidenciasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ver_incidencias_completa/:ct_id_incidencia',
    component: VerIncidenciasCompletaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar_incidencia',
    component: RegistrarIncidenciasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar_diagnosticos/:ct_id_incidencia',
    component: RegistrarDiagnosticosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ver_diagnosticos/:ct_id_incidencia',
    component: VerDiagnosticosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'asignar_incidencias/:ct_id_incidencia',
    component: AsignarIncidenciasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gestionar_usuarios',
    component: GestionarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crear_usuarios',
    component: CrearUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar_usuarios/:cn_id_usuario',
    component: EditarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reportes_carga_trabajo',
    component: ReporteCargaPorTrabajoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar_incidencia/:ct_id_incidencia',
    component: EditarIncidenciaComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
