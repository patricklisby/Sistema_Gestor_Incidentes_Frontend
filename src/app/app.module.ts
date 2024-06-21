import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VerIncidenciasComponent } from './ver-incidencias/ver-incidencias.component';
import { VerIncidenciasCompletaComponent } from './ver-incidencias-completa/ver-incidencias-completa.component';
import { RegistrarIncidenciasComponent } from './registrar-incidencias/registrar-incidencias.component';
import { VerDiagnosticosComponent } from './ver-diagnosticos/ver-diagnosticos.component';
import { RegistrarDiagnosticosComponent } from './registrar-diagnosticos/registrar-diagnosticos.component';
import { AsignarIncidenciasComponent } from './asignar-incidencias/asignar-incidencias.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ReporteCargaPorTrabajoComponent } from './reporte-carga-por-trabajo/reporte-carga-por-trabajo.component';
import { EditarIncidenciaComponent } from './editar-incidencia/editar-incidencia.component';


import { SidemenuComponent } from './components/sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    VerIncidenciasComponent,
    VerIncidenciasCompletaComponent,
    RegistrarIncidenciasComponent,
    VerDiagnosticosComponent,
    RegistrarDiagnosticosComponent,
    SidemenuComponent,
    AsignarIncidenciasComponent,
    CrearUsuariosComponent,
    GestionarUsuariosComponent,
    EditarUsuariosComponent,
    ReporteCargaPorTrabajoComponent,
    EditarIncidenciaComponent
  ],
  imports:[
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
