import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';

@Component({
  selector: 'app-ver-incidencias-completa',
  templateUrl: './ver-incidencias-completa.component.html',
  styleUrls: ['./ver-incidencias-completa.component.scss'],
})
export class VerIncidenciasCompletaComponent implements OnInit {

  incidencias: any[] = [];

  constructor(
    private incidenciasService: IncidenciasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const ct_id_incidencia = params.get('ct_id_incidencia');
      if (ct_id_incidencia) {
        this.loadIncidencia(ct_id_incidencia);
      }
    });
  }

  async loadIncidencia(ct_id_incidencia: string) {
    try {
      // Cargar la incidencia de forma asíncrona
      const result = await this.incidenciasService.mostrar_incidencias_por_id(ct_id_incidencia);
      this.incidencias = result;
      console.log(this.incidencias);
      
      
    } catch (error) {
      console.error('Error loading incidencia', error);
    }
  }
}
