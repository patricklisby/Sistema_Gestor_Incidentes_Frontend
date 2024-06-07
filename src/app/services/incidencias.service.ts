import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';
  constructor(private http: HttpClient, private alertController: AlertController) { }

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

  async registrar_incidencia(ct_titulo_incidencia: string, ct_descripcion_incidencia: string, ct_lugar: string, cn_id_usuario_registro: number, image: File): Promise<any> {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const formData = new FormData();
      formData.append('ct_titulo_incidencia', ct_titulo_incidencia);
      formData.append('ct_descripcion_incidencia', ct_descripcion_incidencia);
      formData.append('ct_lugar', ct_lugar);
      formData.append('cn_id_usuario_registro', cn_id_usuario_registro.toString());
      formData.append('image', image);

      const response = await this.http.post(`${this.apiURL}registrar_incidencia`, formData, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error al registrar la incidencia:', error);
      throw error;
    }
  }
}
