import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  
  nombreUsuario?: string;
  canAddIncidentes: boolean = false;
  canManageSystem: boolean = false;
  canViewReports: boolean = false;
  canManageIncidentes : boolean = false;
  intervalId: any;

  constructor(private authService: AuthService, private router: Router, private menu: MenuController) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Obtiene la información del usuario y configura los permisos del menú lateral.
   */
  ngOnInit() {
    this.loadUserInfo();
    this.intervalId = setInterval(() => {
      this.loadUserInfo();
    }, 5000); // Recarga cada 5 segundos
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Detiene el intervalo de recarga.
   */
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Carga la información del usuario y configura los permisos del menú lateral.
   */
  loadUserInfo() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.nombreUsuario = userInfo.nombre;
      const roles = userInfo.roles;
      this.canAddIncidentes = this.checkRole(roles, [1, 2, 3, 4, 5]); // Todos los roles
      this.canManageSystem = this.checkRole(roles, [1]); // Solo rol 1
      this.canViewReports = this.checkRole(roles, [1, 3]); // Roles 1 y 3
      this.canManageIncidentes = this.checkRole(roles, [1, 3]); // Roles 1 y 3
    }
  }

  /**
   * Verifica si algún rol del usuario coincide con los roles permitidos.
   * @param userRoles Los roles del usuario.
   * @param allowedRoles Los roles permitidos.
   * @returns `true` si el usuario tiene al menos uno de los roles permitidos, de lo contrario `false`.
   */
  checkRole(userRoles: number[], allowedRoles: number[]): boolean {
    return userRoles.some(role => allowedRoles.includes(role));
  }

  /**
   * Navega a la página de registro de incidentes y cierra el menú.
   */
  navegar_incidentes() {
    this.router.navigate(['/registrar_incidencia']).then(() => {
      this.menu.close();
    });
  }

  /**
   * Navega a la página de visualización de incidentes y cierra el menú.
   */
  navegar_ver_incidencias() {
    this.router.navigate(['/ver_incidencias']).then(() => {
      this.menu.close();
    });
  }

  /**
   * Navega a la página de gestión de incidentes y cierra el menú.
   */
  navegar_gestionar_incidencias() {
    this.router.navigate(['/folder/favorites']).then(() => {
      this.menu.close();
    });
  }

  /**
   * Navega a la página de gestión del sistema y cierra el menú.
   */
  navegar_gestionar_sistema() {
    this.router.navigate(['gestionar_usuarios']).then(() => {
      this.menu.close();
    });
  }

  /**
   * Navega a la página de reportes y cierra el menú.
   */
  navegar_reportes() {
    this.router.navigate(['reportes_carga_trabajo']).then(() => {
      this.menu.close();
    });
  }

  /**
   * Cierra la sesión del usuario, cierra el menú y navega a la página de inicio de sesión.
   */
  cerrar_sesion() {
    this.authService.logout();
    this.menu.close();
    this.router.navigate(['/login']);
  }
}
