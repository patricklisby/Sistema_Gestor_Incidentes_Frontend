import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';

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
      // Realizar acciones adicionales si es necesario, como redirigir al usuario
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
      throw error; // Lanza el error para que el componente que llama pueda manejarlo si es necesario
    }
  }
  
 
}//End of AuthService
