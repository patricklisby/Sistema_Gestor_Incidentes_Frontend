import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-reporte-carga-por-trabajo',
  templateUrl: './reporte-carga-por-trabajo.component.html',
  styleUrls: ['./reporte-carga-por-trabajo.component.scss'],
})
export class ReporteCargaPorTrabajoComponent implements OnInit {
  reportData: any[] = [];
  incidenciasTerminadas: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Llama al método para obtener el reporte de carga de trabajo.
   */
  ngOnInit() {
    this.obtenerReporteCargaTrabajo();
  }

  /**
   * Obtiene el reporte de carga de trabajo desde el servicio de usuarios.
   * Asigna los datos del reporte a la propiedad `reportData` y extrae las incidencias terminadas.
   */
  async obtenerReporteCargaTrabajo() {
    try {
      this.reportData = await this.usuariosService.obtenerReporteCargaTrabajo();
      this.incidenciasTerminadas = this.reportData.reduce((acc: any[], data: any) => acc.concat(data.incidenciasTerminadas || []), []);
    } catch (error) {
      console.error('Error al obtener reporte de carga de trabajo:', error);
    }
  }
}
