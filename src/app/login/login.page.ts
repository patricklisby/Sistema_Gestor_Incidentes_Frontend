import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ct_correo_institucional: string = '';
  ct_contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Verifica si hay un usuario logueado e imprime la información del usuario en la consola.
   */
  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
   
  }

  /**
   * Maneja el evento de inicio de sesión.
   * Llama al método de autenticación del servicio `AuthService` con las credenciales del usuario.
   * Si la autenticación es exitosa, muestra un mensaje de bienvenida y navega a la página de visualización de incidencias.
   * Si la autenticación falla, muestra un mensaje de error.
   * @param event El evento de formulario.
   */
  async login(event: Event) {
    event.preventDefault();
    try {
      const response = await this.authService.login(this.ct_correo_institucional, this.ct_contrasena);
      if (response) {
        const userInfo = this.authService.getUserInfo();
        if (userInfo) {
          this.showToast(`Bienvenido, ${userInfo.nombre}`);
        }
        this.router.navigate(['/ver_incidencias']);
      }
    } catch (error) {
      console.error('No se pudo iniciar sesión', error);
      this.showToast('No se pudo iniciar sesión');
    }
  }

  /**
   * Muestra un mensaje toast en la pantalla.
   * @param message El mensaje a mostrar en el toast.
   */
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
