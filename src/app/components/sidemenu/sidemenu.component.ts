import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  
  nombreUsuario?: string;
  canAddIncidentes: boolean = false;
  canManageSystem: boolean = false;
  canViewReports: boolean = false;
  canManageIncidentes : boolean = false;

  constructor(private authService: AuthService, private router: Router, private menu: MenuController) { }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.nombreUsuario = userInfo.nombre;
      const roles = userInfo.roles;
      this.canAddIncidentes = this.checkRole(roles, [1, 2, 3, 4, 5]); // Todos los roles
      this.canManageSystem = this.checkRole(roles, [1]); // Solo rol 1
      this.canViewReports = this.checkRole(roles, [1,3]); // Solo rol 3
      this.canManageIncidentes = this.checkRole(roles, [1,3]);
    }
  }
 
  checkRole(userRoles: number[], allowedRoles: number[]): boolean {
    return userRoles.some(role => allowedRoles.includes(role));
  }

  navegar_incidentes() {
    this.router.navigate(['/registrar_incidencia']).then(() => {
      this.menu.close();
    });
  }

  navegar_ver_incidencias() {
    this.router.navigate(['/ver_incidencias']).then(() => {
      this.menu.close();
    });
  }

  navegar_gestionar_incidencias() {
    this.router.navigate(['/folder/favorites']).then(() => {
      this.menu.close();
    });
  }

  navegar_gestionar_sistema() {
    this.router.navigate(['gestionar_usuarios']).then(() => {
      this.menu.close();
    });
  }

  navegar_reportes() {
    this.router.navigate(['reportes_carga_trabajo']).then(() => {
      this.menu.close();
    });
  }

  cerrar_sesion() {
    this.authService.logout();
    this.menu.close();
    this.router.navigate(['/login']);
  }
}
