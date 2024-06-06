import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VerIncidenciasComponent } from './ver-incidencias/ver-incidencias.component';
import { VerIncidenciasCompletaComponent } from './ver-incidencias-completa/ver-incidencias-completa.component';
import { RegistrarIncidenciasComponent } from './registrar-incidencias/registrar-incidencias.component';
import { RegistrarDiagnosticosComponent } from './registrar-diagnosticos/registrar-diagnosticos.component';
import { VerDiagnosticosComponent } from './ver-diagnosticos/ver-diagnosticos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ver_incidencias',
    component: VerIncidenciasComponent,
  },
  {
    path: 'ver_incidencias_completa/:ct_id_incidencia',
    component: VerIncidenciasCompletaComponent
  },
  {
    path: 'registrar_incidencia',
    component: RegistrarIncidenciasComponent
  },
  {
    path: 'registrar_diagnosticos/:ct_id_incidencia',
    component: RegistrarDiagnosticosComponent
  },
  {
    path: 'ver_diagnosticos/:ct_id_incidencia',
    component: VerDiagnosticosComponent // Corrige este componente
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
