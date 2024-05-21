import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import {  MostrarIncidenciasComponent } from '../mostrar-incidencias/mostrar-incidencias.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,

    children: [
      {
        path: 'mostrar_incidencias',
        component: MostrarIncidenciasComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
