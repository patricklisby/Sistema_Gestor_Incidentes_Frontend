import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {

  
  private apiURL = 'http://127.0.0.1:3000/';
  constructor(private http: HttpClient, private alertController: AlertController) { }


  async mostrar_diagnosticos_por_id(ct_id_incidencia: string): Promise<any> {
    try {
      console.log(ct_id_incidencia + " Esto es lo que tiene de id");
      
      const response = await this.http.get(`${this.apiURL}mostrar_diagnosticos_por_id/${ct_id_incidencia}`).toPromise();
      console.log('Mostrar diagnosticos', response);
      return response;
    } catch (error) {
      console.error('Error en mostrar_diagnosticos_por_id:', error);
      throw error;
    }
  }//End of mostrar_incidencias_por_id

  async mostrar_diagnosticos_por_usuario(ct_id_incidencia: string): Promise<any> {
    try {
      console.log(ct_id_incidencia + " Esto es lo que tiene de id");
      
      const response = await this.http.get(`${this.apiURL}mostrar_diagnosticos_por_usuario/${ct_id_incidencia}`).toPromise();
      console.log('Mostrar diagnosticos', response);
      return response;
    } catch (error) {
      console.error('Error en mostrar_diagnosticos_por_id:', error);
      throw error;
    }
  }//End of mostrar_incidencias_por_id

  async registrar_diagnosticos(ct_diagnostico:string, ct_tiempo_estimado_reparacion:string, ct_observaciones:string, ct_id_incidencia:string, cn_id_usuario_registro: number): Promise<any> {
    try {

      const requestBody = {
        ct_diagnostico,
        ct_tiempo_estimado_reparacion,
        ct_observaciones,
        ct_id_incidencia,
        cn_id_usuario_registro,
      };
      //console.log(requestBody);

      const response = await this.http.post(`${this.apiURL}registrar_diagnosticos`, requestBody).toPromise();
      console.log('Diagnostico registrada:', response);
      return response;
    } catch (error) {
      console.error('Hubo un error en registro de diagnosticos', error);
      throw error;
    }
  }

  
}
