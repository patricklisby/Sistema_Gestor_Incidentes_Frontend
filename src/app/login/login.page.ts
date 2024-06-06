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

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      console.log('Usuario logueado:', userInfo);
    } else {
      console.log('No hay usuario logueado');
    }
  }

  async login(event: Event) {
    event.preventDefault();
    try {
      const response = await this.authService.login(this.ct_correo_institucional, this.ct_contrasena);
      if (response) {
        const userInfo = this.authService.getUserInfo();
        if (userInfo) {
          this.showToast(`Usuario logueado: ${userInfo.nombre}`);
        }
        this.router.navigate(['/ver_incidencias']); // Cambia esta línea
      }
    } catch (error) {
      console.error('No se pudo iniciar sesión', error);
    }
  }
  
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
