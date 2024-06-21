import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';
import { DiagnosticosService } from '../services/diagnosticos.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AsignarIncidenciasComponent } from '../asignar-incidencias/asignar-incidencias.component';
import { UsuariosService } from '../services/usuarios.service';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { ToastController } from '@ionic/angular';

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
    private authService: AuthService, // Inject AuthService
    private toastController: ToastController,
  ) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Obtiene la información del usuario logueado y los permisos del usuario.
   * También carga la incidencia y los diagnósticos relacionados con la incidencia.
   */
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

  /**
   * Establece los permisos del usuario basado en sus roles.
   */
  setPermissions() {
    this.canRegisterDiagnostico = this.checkRole([4]);
    this.canChangeEstado = this.checkRole([4]);
    this.canAssignIncidencias = this.checkRole([3]);
    this.canAcceptReject = this.checkRole([5]);
  }

  /**
   * Verifica si el usuario tiene alguno de los roles permitidos.
   * @param allowedRoles Los roles permitidos para una acción.
   * @returns `true` si el usuario tiene uno de los roles permitidos, de lo contrario `false`.
   */
  checkRole(allowedRoles: number[]): boolean {
    return this.roles.some(role => allowedRoles.includes(role));
  }

  /**
   * Carga la información de una incidencia específica.
   * @param ct_id_incidencia El ID de la incidencia.
   */
  async loadIncidencia(ct_id_incidencia: string) {
    try {
      const result = await this.incidenciasService.mostrar_incidencias_por_id(ct_id_incidencia);
      this.incidencia = result;
      this.imagenes = result.imagenes;
      this.isTerminated = this.incidencia.cn_id_estado >= 6; // Actualiza la propiedad isTerminated
    } catch (error) {
      console.error('Error loading incidencia', error);
    }
  }

  /**
   * Carga los diagnósticos relacionados con una incidencia específica.
   * @param ct_id_incidencia El ID de la incidencia.
   */
  async loadDiagnosticos(ct_id_incidencia: string) {
    try {
      const result = await this.diagnosticosService.mostrar_diagnosticos_por_id_incidencia(ct_id_incidencia);
      this.diagnosticos = result;
    } catch (error) {
      console.error('Error loading diagnosticos', error);
    }
  }

  /**
   * Cambia el estado de una incidencia.
   * @param ct_id_incidencia El ID de la incidencia.
   */
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

  /**
   * Valida el resultado de una incidencia.
   * @param ct_id_incidencia El ID de la incidencia.
   * @param id_opcion La opción seleccionada (1 para aceptar, otro valor para rechazar).
   */
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

  /**
   * Navega a la página de visualización de incidencias.
   */
  navegar_incidencias() {
    this.router.navigate(['/ver_incidencias']);
  }

  /**
   * Navega a la página de creación de diagnósticos.
   * @param ct_id_incidencia El ID de la incidencia.
   */
  navegar_crear_diagnosticos(ct_id_incidencia: string) {
    this.router.navigate(['/registrar_diagnosticos', ct_id_incidencia]);
  }

  /**
   * Abre un modal para asignar técnicos a una incidencia.
   * @param ct_id_incidencia El ID de la incidencia.
   */
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
}
