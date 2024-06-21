import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las incidencias.
   * @returns Una promesa que se resuelve con los datos de las incidencias.
   */
  async mostrar_incidencias(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_incidentes`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al mostrar incidencias:', error);
      throw error;
    }
  }

  /**
   * Obtiene las incidencias por ID de incidencia.
   * @param ct_id_incidencia El ID de la incidencia.
   * @returns Una promesa que se resuelve con los datos de la incidencia.
   */
  async mostrar_incidencias_por_id(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_incidentes_por_id/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_incidencias_por_id:', error);
      throw error;
    }
  }

  /**
   * Obtiene las incidencias por ID de usuario.
   * @param ct_id_incidencia El ID del usuario.
   * @returns Una promesa que se resuelve con los datos de las incidencias del usuario.
   */
  async mostrar_incidencias_por_usuario(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_incidencias_por_usuario/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_incidencias_por_usuario:', error);
      throw error;
    }
  }

  /**
   * Registra una nueva incidencia.
   * @param formData Los datos del formulario que contienen la información de la incidencia.
   * @returns Una promesa que se resuelve con la respuesta del registro de la incidencia.
   */
  async registrar_incidencia(formData: FormData): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response = await this.http.post(`${this.apiURL}registrar_incidencia`, formData, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al registrar la incidencia:', error);
      throw error;
    }
  }

  /**
   * Asigna una incidencia a un usuario.
   * @param ct_id_incidencia El ID de la incidencia.
   * @param cn_id_usuario El ID del usuario.
   * @returns Una promesa que se resuelve con la respuesta de la asignación.
   */
  async asignarIncidencias(ct_id_incidencia: string, cn_id_usuario: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      const body = { ct_id_incidencia, cn_id_usuario };
      const response = await this.http.post(`${this.apiURL}asignar_incidentes`, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al asignar la incidencia:', error);
      throw error;
    }
  }
}
