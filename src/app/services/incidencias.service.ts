import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {


  private apiURL = 'http://127.0.0.1:3000/';
  constructor(private http: HttpClient, private alertController: AlertController) { }

  async mostrar_incidencias(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiURL}mostrar_incidentes`).toPromise();
      console.log('Mostrar incidencias', response);
      return response;
      
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async mostrar_incidencias_por_id(ct_id_incidencia: string): Promise<any> {
    try {
      console.log(ct_id_incidencia + " Esto es lo que tiene de id");
      
      const response = await this.http.get(`${this.apiURL}mostrar_incidentes_por_id/${ct_id_incidencia}`).toPromise();
      console.log('Mostrar incidencias', response);
      return response;
    } catch (error) {
      console.error('Error en mostrar_incidencias_por_id:', error);
      throw error;
    }
  }//End of mostrar_incidencias_por_id

  async mostrar_incidencias_por_usuario(ct_id_incidencia: string): Promise<any> {
    try {
      console.log(ct_id_incidencia + " Esto es lo que tiene de id");
      
      const response = await this.http.get(`${this.apiURL}mostrar_incidencias_por_usuario/${ct_id_incidencia}`).toPromise();
      console.log('Mostrar incidencias', response);
      return response;
    } catch (error) {
      console.error('Error en mostrar_incidencias_por_id:', error);
      throw error;
    }
  }//End of mostrar_incidencias_por_id

  async registrar_incidencia(ct_titulo_incidencia: string, ct_descripcion_incidencia: string, ct_lugar: string, cn_id_usuario_registro: number): Promise<any> {
    try {

      const requestBody = {
        ct_titulo_incidencia,
        ct_descripcion_incidencia,
        ct_lugar,
        cn_id_usuario_registro,
      };

      const response = await this.http.post(`${this.apiURL}registrar_incidencia`, requestBody).toPromise();
      console.log('Incidencia registrada:', response);
      return response;
    } catch (error) {
      console.error('Error al registrar la incidencia:', error);
      throw error;
    }
  }

  
}
