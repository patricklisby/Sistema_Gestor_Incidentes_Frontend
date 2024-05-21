import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { MostrarIncidenciasComponent } from '../mostrar-incidencias/mostrar-incidencias.component';
//import { View2Component } from './view2/view2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [
    FolderPage,
    MostrarIncidenciasComponent
  ]
})
export class FolderPageModule {}