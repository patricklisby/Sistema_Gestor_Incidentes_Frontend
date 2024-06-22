import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de técnicos.
   * @returns Una promesa que se resuelve con los datos de los técnicos.
   */
  async mostrar_tecnicos(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_tecnicos`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener técnicos:', error);
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario.
   * @param usuario Los datos del usuario a registrar.
   * @returns Una promesa que se resuelve con la respuesta del registro del usuario.
   */
  async registrar_usuarios(usuario: any): Promise<any> {
    try {
      const response = await this.http.post(`${this.apiURL}registrar`, usuario).toPromise();
      return response;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de roles.
   * @returns Una promesa que se resuelve con los datos de los roles.
   */
  async obtener_roles(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_roles`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener roles:', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de usuarios.
   * @returns Una promesa que se resuelve con los datos de los usuarios.
   */
  async obtener_usuarios(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_usuarios`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de departamentos.
   * @returns Una promesa que se resuelve con los datos de los departamentos.
   */
  async obtener_departamentos(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_departamentos`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      throw error;
    }
  }

  /**
   * Cambia el estado de una incidencia por parte de un técnico.
   * @param ct_id_incidencia El ID de la incidencia.
   * @returns Una promesa que se resuelve con la respuesta de la operación.
   */
  async cambiarEstadoPorTecnicos(ct_id_incidencia: string, cn_id_usuario:any): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      const body = { ct_id_incidencia, cn_id_usuario };
      const response = await this.http.post(`${this.apiURL}cambiar_estado_por_tecnicos`, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al cambiar estado de la incidencia:', error);
      throw error;
    }
  }

  /**
   * Cambia el estado de una incidencia por parte de un supervisor.
   * @param ct_id_incidencia El ID de la incidencia.
   * @param cn_id_estado El nuevo estado de la incidencia.
   * @returns Una promesa que se resuelve con la respuesta de la operación.
   */
  async cambiar_estado_por_supervisor(ct_id_incidencia: string, cn_id_estado: any, cn_id_usuario: any): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      const body = { ct_id_incidencia, cn_id_estado, cn_id_usuario };
      const response = await this.http.post(`${this.apiURL}cambiar_estado_supervisor`, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al cambiar estado de la incidencia:', error);
      throw error;
    }
  }

  /**
   * Obtiene el reporte de carga de trabajo.
   * @returns Una promesa que se resuelve con los datos del reporte de carga de trabajo.
   */
  async obtenerReporteCargaTrabajo(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}reporte_carga_trabajo`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener reporte de carga de trabajo:', error);
      throw error;
    }
  }

  /**
   * Obtiene las incidencias de un usuario específico.
   * @param cn_id_usuario El ID del usuario.
   * @returns Una promesa que se resuelve con los datos de las incidencias del usuario.
   */
  async mostrar_incidencias_por_usuario(cn_id_usuario: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_incidencias_por_usuario/${cn_id_usuario}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener incidencias por usuario:', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de estados.
   * @returns Una promesa que se resuelve con los datos de los estados.
   */
  async obtenerEstados(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_roles`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los estados:', error);
      throw error;
    }
  }

  async obtenerPrioridades(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_prioridades`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las prioridades:', error);
      throw error;
    }
  }

  async obtenerRiesgos(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_riesgos`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los riesgos:', error);
      throw error;
    }
  }

  async obtenerAfectaciones(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_afectaciones`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las afectaciones:', error);
      throw error;
    }
  }

  async obtenerCategorias(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_categorias`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw error;
    }
  }

}
