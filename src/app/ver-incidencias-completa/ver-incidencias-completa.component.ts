import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';
import { DiagnosticosService } from '../services/diagnosticos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-incidencias-completa',
  templateUrl: './ver-incidencias-completa.component.html',
  styleUrls: ['./ver-incidencias-completa.component.scss'],
})
export class VerIncidenciasCompletaComponent implements OnInit {

  incidencias: any[] = [];
  diagnosticos: any[] = [];

  constructor(
    private incidenciasService: IncidenciasService,
    private diagnosticosService: DiagnosticosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const ct_id_incidencia = params.get('ct_id_incidencia');
      if (ct_id_incidencia) {
        this.loadIncidencia(ct_id_incidencia);
        this.loadDiagnosticos(ct_id_incidencia);
      }
    });
  }

  async loadIncidencia(ct_id_incidencia: string) {
    try {
      // Cargar la incidencia de forma asíncrona
      const result = await this.incidenciasService.mostrar_incidencias_por_id(ct_id_incidencia);
      this.incidencias = result;
      //console.log("Esto es loadIncidencia");
     // console.log(this.incidencias);
      
      
    } catch (error) {
      console.error('Error loading incidencia', error);
    }
  }//end of loadIncidencias

  async loadDiagnosticos(ct_id_incidencia: string) {
    try {
      const result = await this.diagnosticosService.mostrar_diagnosticos_por_id_incidencia(ct_id_incidencia);
      //console.log(result);
      this.diagnosticos = result;
     // console.log(this.diagnosticos);
    } catch (error) {
      console.error('Error loading diagnosticos', error);
    }
  }

  navigateToIncidencias() {
    this.router.navigate(['/ver_incidencias']);
  }

  navigateToCreateDiagnosticos(ct_id_incidencia: string) {
    this.router.navigate(['/registrar_diagnosticos', ct_id_incidencia]);
  }
}
