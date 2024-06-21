import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los diagnósticos por ID de incidencia.
   * @param ct_id_incidencia El ID de la incidencia.
   * @returns Una promesa que se resuelve con los datos de los diagnósticos.
   */
  async mostrar_diagnosticos_por_id_incidencia(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_diagnosticos_id_incidencia/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_diagnosticos_por_id_incidencia:', error);
      throw error;
    }
  }

  /**
   * Registra nuevos diagnósticos.
   * @param formData Los datos del formulario que contienen la información del diagnóstico y las imágenes.
   * @returns Una promesa que se resuelve con la respuesta del registro de diagnóstico.
   */
  async registrar_diagnosticos(formData: FormData): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const response = await this.http.post(`${this.apiURL}registrar_diagnosticos`, formData, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Hubo un error en registro de diagnosticos', error);
      throw error;
    }
  }
}
