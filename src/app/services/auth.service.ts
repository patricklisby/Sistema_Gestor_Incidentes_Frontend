import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient, private alertController: AlertController) { }


  async login(ct_correo_institucional: string, ct_contrasena: string): Promise<any> {
    try {
      const response = await this.http.post(`${this.apiURL}login`, { ct_correo_institucional, ct_contrasena }).toPromise();
      console.log('Login exitoso', response);
      return response;
      
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

  
}