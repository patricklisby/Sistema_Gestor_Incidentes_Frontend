import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  async mostrar_incidencias(): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_incidentes`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Login error:', error);
    }
  }

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

  async mostrar_incidencias_por_usuario(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_incidencias_por_usuario/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_incidencias_por_id:', error);
      throw error;
    }
  }

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
}
