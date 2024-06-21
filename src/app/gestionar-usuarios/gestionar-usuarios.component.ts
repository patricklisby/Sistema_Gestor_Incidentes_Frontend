import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss'],
})
export class GestionarUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  searchTerm: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private navCtrl: NavController
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Carga la lista de usuarios.
   */
  ngOnInit() {
    this.cargarUsuarios();
  }

  /**
   * Carga los usuarios desde el servicio de usuarios y los asigna a las propiedades `usuarios` y `usuariosFiltrados`.
   */
  async cargarUsuarios() {
    this.usuarios = await this.usuariosService.obtener_usuarios();
    this.usuariosFiltrados = this.usuarios;
  }

  /**
   * Navega a la página de creación de usuarios.
   */
  agregarUsuario() {
    this.navCtrl.navigateForward('/crear_usuarios');
  }

  /**
   * Navega a la página de edición de usuarios.
   * @param id El ID del usuario a editar.
   */
  editarUsuario(id: number) {
    this.navCtrl.navigateForward(`/editar-usuario/${id}`);
  }

  /**
   * Filtra la lista de usuarios según el término de búsqueda.
   * @param event El evento de entrada del campo de búsqueda.
   */
  buscarUsuarios(event: any) {
    const query = event.target.value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.ct_nombre_completo.toLowerCase().includes(query) ||
      usuario.ct_descripcion_puesto.toLowerCase().includes(query)
    );
  }
}
