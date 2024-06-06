import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';
  private isAuthenticated: boolean = false;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  isAuthenticatedSesion(): boolean {
    return this.isAuthenticated;
  }
  
  async login(ct_correo_institucional: string, ct_contrasena: string): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiURL}login`, { ct_correo_institucional, ct_contrasena }).toPromise();
      console.log('Login exitoso', response);
  
      if (response && response.token) {
        localStorage.setItem(this.tokenKey, response.token);
        this.isAuthenticated = true; // Marcar como autenticado
        return response;
      } else {
        console.error('La respuesta no contiene el token:', response);
        const alert = await this.alertController.create({
          header: 'Error al ingresar.',
          message: 'No se pudo obtener el token de autenticación.',
          buttons: ['OK']
        });
        await alert.present();
      }
  
    } catch (error) {
      console.error('Login error:', error);
      const alert = await this.alertController.create({
        header: 'Error al ingresar.',
        message: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async logout(): Promise<any> {
    try {
      const response = await this.http.post(`${this.apiURL}logout`, null).toPromise();
      console.log('Logout exitoso', response);
      localStorage.removeItem(this.tokenKey);  // Remover el token del localStorage
      this.isAuthenticated = false; // Marcar como no autenticado
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

  getUserInfo(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
}
