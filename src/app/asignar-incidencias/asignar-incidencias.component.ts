import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { IncidenciasService } from '../services/incidencias.service';

@Component({
  selector: 'app-asignar-incidencias',
  templateUrl: './asignar-incidencias.component.html',
  styleUrls: ['./asignar-incidencias.component.scss'],
})
export class AsignarIncidenciasComponent implements OnInit {
  @Input() ct_id_incidencia: string = ''; // Inicializar con una cadena vacía
  tecnicos: any[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private usuariosService: UsuariosService,
    private incidenciasService: IncidenciasService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.tecnicos = await this.usuariosService.mostrar_tecnicos();
      this.tecnicos = this.tecnicos.map(tecnico => ({
        ...tecnico,
        seleccionado: false
      }));
    } catch (error) {
      console.error('Error al cargar técnicos:', error);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async asignarTecnicos() {
    const tecnicosSeleccionados = this.tecnicos.filter(tecnico => tecnico.seleccionado);
    try {
      for (const tecnico of tecnicosSeleccionados) {
        await this.incidenciasService.asignarIncidencias(this.ct_id_incidencia, tecnico.cn_id_usuario);
      }
      this.presentToast('Asignación exitosa', 'success');
      this.modalController.dismiss(tecnicosSeleccionados);
    } catch (error) {
      console.error('Error al asignar técnicos:', error);
      this.presentToast('Error al asignar técnicos', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
