import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss'],
})
export class CrearUsuariosComponent implements OnInit {

  usuarioForm: FormGroup;
  roles: any[] = [];
  departamentos: any[] = [];

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
    this.cargarDepartamentos();
  }

  async cargarRoles() {
    this.roles = await this.usuariosService.obtener_roles();
    console.log('Roles loaded:', this.roles);  // Check loaded roles
  }
  

  async cargarDepartamentos() {
    this.departamentos = await this.usuariosService.obtener_departamentos();
    console.log('Departamentos loaded:', this.departamentos);  // Check loaded departments
  }
  

  async onSubmit() {
    if (this.usuarioForm.valid) {
      try {
        await this.usuariosService.registrar_usuarios(this.usuarioForm.value);
        this.navCtrl.navigateRoot('/gestionar_usuarios');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    }
  }
}
