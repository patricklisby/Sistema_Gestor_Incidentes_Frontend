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

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.usuarios = await this.usuariosService.obtener_usuarios();
    this.usuariosFiltrados = this.usuarios;
  }

  agregarUsuario() {
    this.navCtrl.navigateForward('/crear_usuarios');
  }

  editarUsuario(id: number) {
    this.navCtrl.navigateForward(`/editar-usuario/${id}`);
  }

  buscarUsuarios(event: any) {
    const query = event.target.value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.ct_nombre_completo.toLowerCase().includes(query) ||
      usuario.ct_descripcion_puesto.toLowerCase().includes(query)
    );
  }
}
