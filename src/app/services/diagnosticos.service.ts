import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  async mostrar_diagnosticos_por_id(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_diagnosticos_por_id/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_diagnosticos_por_id:', error);
      throw error;
    }
  }

  async mostrar_diagnosticos_por_usuario(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_diagnosticos_por_usuario/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_diagnosticos_por_usuario:', error);
      throw error;
    }
  }

  async registrar_diagnosticos(ct_diagnostico: string, cn_tiempo_estimado_reparacion: string, ct_observaciones: string, ct_id_incidencia: string, cn_id_usuario: number, image: File): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const formData = new FormData();
      formData.append('ct_diagnostico', ct_diagnostico);
      formData.append('cn_tiempo_estimado_reparacion', cn_tiempo_estimado_reparacion);
      formData.append('ct_observaciones', ct_observaciones);
      formData.append('ct_id_incidencia', ct_id_incidencia);
      formData.append('cn_id_usuario', cn_id_usuario.toString());
      formData.append('image', image);

      const response = await this.http.post(`${this.apiURL}registrar_diagnosticos`, formData, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Hubo un error en registro de diagnosticos', error);
      throw error;
    }
  }

  async mostrar_diagnosticos_por_id_incidencia(ct_id_incidencia: string): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const response = await this.http.get(`${this.apiURL}mostrar_diagnosticos_id_incidencia/${ct_id_incidencia}`, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en mostrar_diagnosticos_por_id:', error);
      throw error;
    }
  }
}
