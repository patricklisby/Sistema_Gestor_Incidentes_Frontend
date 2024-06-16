import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss'],
})
export class CrearUsuariosComponent  implements OnInit {

  usuarioForm: FormGroup;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private navCtrl: NavController
  ) {
    this.usuarioForm = this.fb.group({
      ct_nombre_completo: ['', Validators.required],
      ct_cedula: ['', Validators.required],
      ct_descripcion_puesto: ['', Validators.required],
      ct_celular: ['', Validators.required],
      ct_id_departamento: ['', Validators.required],
      ct_correo_institucional: ['', [Validators.required, Validators.email]],
      ct_contrasena: ['', Validators.required],
      cn_id_rol: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.cargarRoles();
  }

  async cargarRoles() {
    this.roles = await this.usuariosService.obtener_roles();
  }

  async onSubmit() {
    if (this.usuarioForm.valid) {
      try {
        await this.usuariosService.registrar_usuarios(this.usuarioForm.value);
        this.navCtrl.navigateRoot('/');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    }
  }
}
