import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';
import { DiagnosticosService } from '../services/diagnosticos.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AsignarIncidenciasComponent } from '../asignar-incidencias/asignar-incidencias.component';
import { UsuariosService } from '../services/usuarios.service'; 

@Component({
  selector: 'app-ver-incidencias-completa',
  templateUrl: './ver-incidencias-completa.component.html',
  styleUrls: ['./ver-incidencias-completa.component.scss'],
})
export class VerIncidenciasCompletaComponent implements OnInit {

  incidencia: any = {};
  imagenes: string[] = [];
  diagnosticos: any[] = [];

  constructor(
    private incidenciasService: IncidenciasService,
    private diagnosticosService: DiagnosticosService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const ct_id_incidencia = params.get('ct_id_incidencia');
      if (ct_id_incidencia) {
        this.loadIncidencia(ct_id_incidencia);
        this.loadDiagnosticos(ct_id_incidencia);
      }
    });
  }

  async loadIncidencia(ct_id_incidencia: string) {
    try {
      const result = await this.incidenciasService.mostrar_incidencias_por_id(ct_id_incidencia);
      this.incidencia = result;
      this.imagenes = result.imagenes;
    } catch (error) {
      console.error('Error loading incidencia', error);
    }
  }

  async loadDiagnosticos(ct_id_incidencia: string) {
    try {
      const result = await this.diagnosticosService.mostrar_diagnosticos_por_id_incidencia(ct_id_incidencia);
      this.diagnosticos = result;
    } catch (error) {
      console.error('Error loading diagnosticos', error);
    }
  }
 
  async cambiar_estado_incidencias(ct_id_incidencia: string) {
    try {
      const response = await this.usuariosService.cambiarEstadoPorTecnicos(ct_id_incidencia);
      console.log('Estado de la incidencia actualizado:', response);
      // Opcional: Puedes actualizar la vista o hacer alguna otra acción después de cambiar el estado
      this.loadIncidencia(ct_id_incidencia); // Volver a cargar la incidencia para reflejar el nuevo estado
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia:', error);
    }
  }
  

  navegar_incidencias() {
    this.router.navigate(['/ver_incidencias']);
  }

  navegar_crear_diagnosticos(ct_id_incidencia: string) {
    this.router.navigate(['/registrar_diagnosticos', ct_id_incidencia]);
  }

  async navegar_asingacion_incidencias(ct_id_incidencia: string) {
    const modal = await this.modalController.create({
      component: AsignarIncidenciasComponent,
      componentProps: {
        ct_id_incidencia: ct_id_incidencia
      }
    });

    modal.onDidDismiss().then((data) => {
      const tecnicosSeleccionados = data.data;
      if (tecnicosSeleccionados) {
        console.log('Técnicos seleccionados:', tecnicosSeleccionados);
        // Aquí puedes manejar los técnicos seleccionados (por ejemplo, asignarlos a la incidencia)
      }
    });

    return await modal.present();
  }
}
