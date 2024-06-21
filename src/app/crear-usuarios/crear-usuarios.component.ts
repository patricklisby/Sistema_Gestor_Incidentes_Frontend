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
    // Inicializa el formulario con validadores
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

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Carga los roles y departamentos disponibles.
   */
  ngOnInit() {
    this.cargarRoles();
    this.cargarDepartamentos();
  }

  /**
   * Carga los roles desde el servicio de usuarios y los asigna a la propiedad `roles`.
   */
  async cargarRoles() {
    this.roles = await this.usuariosService.obtener_roles();
  }

  /**
   * Carga los departamentos desde el servicio de usuarios y los asigna a la propiedad `departamentos`.
   */
  async cargarDepartamentos() {
    this.departamentos = await this.usuariosService.obtener_departamentos();
  }

  /**
   * Envía el formulario para registrar un nuevo usuario.
   * Si el formulario es válido, llama al servicio de usuarios para registrar el usuario y navega a la página de gestión de usuarios.
   */
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
