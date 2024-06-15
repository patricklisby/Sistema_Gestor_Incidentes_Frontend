import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiURL = 'http://127.0.0.1:3000/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

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
    }
  }
}
