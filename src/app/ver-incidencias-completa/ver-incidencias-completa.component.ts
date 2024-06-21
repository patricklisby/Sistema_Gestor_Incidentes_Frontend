import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';
import { DiagnosticosService } from '../services/diagnosticos.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AsignarIncidenciasComponent } from '../asignar-incidencias/asignar-incidencias.component';
import { UsuariosService } from '../services/usuarios.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ver-incidencias-completa',
  templateUrl: './ver-incidencias-completa.component.html',
  styleUrls: ['./ver-incidencias-completa.component.scss'],
})
export class VerIncidenciasCompletaComponent implements OnInit {

  incidencia: any = {};
  imagenes: string[] = [];
  diagnosticos: any[] = [];
  roles: number[] = [];
  isTerminated: boolean = false;

  canRegisterDiagnostico: boolean = false;
  canChangeEstado: boolean = false;
  canAssignIncidencias: boolean = false;
  canAcceptReject: boolean = false;

  constructor(
    private incidenciasService: IncidenciasService,
    private diagnosticosService: DiagnosticosService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.roles = userInfo.roles;
      this.setPermissions();
    }

    this.route.paramMap.subscribe(params => {
      const ct_id_incidencia = params.get('ct_id_incidencia');
      if (ct_id_incidencia) {
        this.loadIncidencia(ct_id_incidencia);
        this.loadDiagnosticos(ct_id_incidencia);
      }
    });
  }

  setPermissions() {
    this.canRegisterDiagnostico = this.checkRole([4]);
    this.canChangeEstado = this.checkRole([4]);
    this.canAssignIncidencias = this.checkRole([3]);
    this.canAcceptReject = this.checkRole([5]);
  }

  checkRole(allowedRoles: number[]): boolean {
    return this.roles.some(role => allowedRoles.includes(role));
  }

  async loadIncidencia(ct_id_incidencia: string) {
    try {
      const result = await this.incidenciasService.mostrar_incidencias_por_id(ct_id_incidencia);
      this.incidencia = result;
      this.imagenes = result.imagenes;
      this.isTerminated = this.incidencia.cn_id_estado >= 6;
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
      this.loadIncidencia(ct_id_incidencia);
      const successToast = await this.toastController.create({
        message: 'Estado cambiado con éxito',
        duration: 1500,
        position: 'top',
        color: 'success'
      });
      await successToast.present();
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia:', error);
    }
  }

  async validar_resultado(ct_id_incidencia: string, id_opcion: string) {
    try {
      let cn_id_estado;
      if (id_opcion == '1') {
        cn_id_estado = 9;
      } else {
        cn_id_estado = 2;
      }
      const response = await this.usuariosService.cambiar_estado_por_supervisor(ct_id_incidencia, cn_id_estado);
      console.log('Estado de la incidencia actualizado:', response);
      this.loadIncidencia(ct_id_incidencia);
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
      }
    });

    return await modal.present();
  }

  navegar_editar_incidencia(ct_id_incidencia: string) {
    this.router.navigate(['/editar_incidencia', ct_id_incidencia]);
  }
}
