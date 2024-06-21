import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';
  private isAuthenticated: boolean = false;
  private tokenKey = 'authToken';
  private rolesKey = 'userRoles';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  /**
   * Verifica si la sesión está autenticada.
   * @returns `true` si el usuario está autenticado, de lo contrario `false`.
   */
  isAuthenticatedSesion(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Inicia sesión del usuario.
   * @param ct_correo_institucional El correo institucional del usuario.
   * @param ct_contrasena La contraseña del usuario.
   * @returns Una promesa que se resuelve con la respuesta de inicio de sesión.
   */
  async login(ct_correo_institucional: string, ct_contrasena: string): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiURL}login`, { ct_correo_institucional, ct_contrasena }).toPromise();
  
      if (response && response.token) {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.rolesKey, JSON.stringify(response.roles));
        this.isAuthenticated = true;
        return response;
      } else {
        const alert = await this.alertController.create({
          header: 'Error al ingresar.',
          message: 'No se pudo obtener el token de autenticación.',
          buttons: ['OK']
        });
        await alert.present();
      }
  
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error al ingresar.',
        message: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  /**
   * Cierra la sesión del usuario.
   * @returns Una promesa que se resuelve con la respuesta de cierre de sesión.
   */
  async logout(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const response = await this.http.post(`${this.apiURL}logout`, null, {
        headers: { Authorization: `Bearer ${token}` }
      }).toPromise();
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.rolesKey);
      this.isAuthenticated = false;
      return response;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      let errorMessage = 'Error al cerrar sesión. Por favor, inténtalo de nuevo.';
      if (error instanceof HttpErrorResponse && error.status === 401) {
        errorMessage = 'No autorizado para cerrar sesión. Por favor, inicia sesión nuevamente.';
      }
      const alert = await this.alertController.create({
        header: 'Error al cerrar sesión.',
        message: errorMessage,
        buttons: ['OK']
      });
      await alert.present();
      throw error;
    }
  }

  /**
   * Obtiene la información del usuario logueado a partir del token JWT.
   * @returns Un objeto con la información del usuario o `null` si no hay token.
   */
  getUserInfo(): any {
    const token = localStorage.getItem(this.tokenKey);
    const roles = localStorage.getItem(this.rolesKey);
    let userInfo = null;
    if (token) {
      try {
        userInfo = jwtDecode(token);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    if (roles) {
      try {
        const parsedRoles = JSON.parse(roles).map((role: any) => role.cn_id_rol);
        userInfo = {
          ...userInfo,
          roles: parsedRoles
        };
      } catch (error) {
        console.error('Error al decodificar los roles:', error);
      }
    }
    return userInfo;
  }

  /**
   * Obtiene el ID del usuario logueado.
   * @returns El ID del usuario o `null` si no hay sesión.
   */
  getUserId(): number | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.userId : null;
  }

  /**
   * Obtiene los roles del usuario logueado.
   * @returns Un array con los roles del usuario o `null` si no hay roles.
   */
  getUserRoles(): number[] | null {
    const roles = localStorage.getItem(this.rolesKey);
    if (roles) {
      try {
        return JSON.parse(roles).map((role: any) => role.cn_id_rol);
      } catch (error) {
        console.error('Error al decodificar los roles:', error);
        return null;
      }
    }
    return null;
  }
}
