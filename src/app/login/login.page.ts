import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ct_correo_institucional: string = '';
  ct_contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  async login(event: Event) {
    event.preventDefault(); //Does not let the form be refreshed
    try {
      //console.log(this.ct_correo_institucional + " ==>"+this.ct_contrasena);
      const response = await this.authService.login(this.ct_correo_institucional, this.ct_contrasena);
      //console.log(response);
      this.router.navigate(['/folder/Ver Incidencias']);
    } catch (error) {
      console.error('No se pudo iniciar Sesion',error);
    } 
  }

}