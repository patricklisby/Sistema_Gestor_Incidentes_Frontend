import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-incidencias',
  templateUrl: './ver-incidencias.component.html',
  styleUrls: ['./ver-incidencias.component.scss'],
})
export class VerIncidenciasComponent implements OnInit, OnDestroy {
  incidencias: any[] = [];
  userInfo: any;
  routerSubscription: Subscription = new Subscription(); // Inicializa la propiedad

  constructor(
    private incidenciasService: IncidenciasService,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   */
  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    // Suscribirse a los eventos de navegación del enrutador para recargar los datos del componente cuando se navegue de regreso.
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.userInfo.roles.length === 1 && this.userInfo.roles[0] === 1) {
          this.loadIncidenciasUsuario(this.userInfo.id);
        } else {
          this.loadIncidencias();
        }
      }
    });

    // Carga inicial de las incidencias
    if (this.userInfo.roles.length === 1 && this.userInfo.roles[0] === 1) {
      this.loadIncidenciasUsuario(this.userInfo.id);
    } else {
      this.loadIncidencias();
    }
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe(); // Desuscribirse de los eventos del enrutador para evitar pérdidas de memoria.
    }
  }

  /**
   * Carga todas las incidencias desde el servicio y las asigna a la propiedad `incidencias`.
   */
  async loadIncidencias() {
    try {
      const data = await this.incidenciasService.mostrar_incidencias();
      this.incidencias = data;
    } catch (error) {
      console.error('Error loading incidencias', error);
    }
  }

  /**
   * Carga las incidencias del usuario especificado desde el servicio y las asigna a la propiedad `incidencias`.
   * @param cn_id_usuario El ID del usuario cuyas incidencias se cargarán.
   */
  async loadIncidenciasUsuario(cn_id_usuario: string) {
    try {
      const data = await this.incidenciasService.mostrar_incidencias_por_usuario(cn_id_usuario);
      this.incidencias = data;
    } catch (error) {
      console.error('Error loading incidencias', error);
    }
  }

  /**
   * Navega a la página de resolución de la incidencia especificada.
   * @param ct_id_incidencia El ID de la incidencia a ver.
   */
  verResolucion(ct_id_incidencia: string) {
    this.router.navigate(['/ver_incidencias_completa', ct_id_incidencia]);
  }
}
