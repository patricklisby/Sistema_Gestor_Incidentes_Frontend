// src/app/ver-incidencias/ver-incidencias.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';

@Component({
  selector: 'app-ver-incidencias',
  templateUrl: './ver-incidencias.component.html',
  styleUrls: ['./ver-incidencias.component.scss'],
})
export class VerIncidenciasComponent implements OnInit {
  incidencias: any[] = [];

  constructor(private incidenciasService: IncidenciasService, private router: Router) {}

  ngOnInit() {
    this.loadIncidencias();
  }

  async loadIncidencias() {
    try {
      const data = await this.incidenciasService.mostrar_incidencias();
      this.incidencias = data;
    } catch (error) {
      console.error('Error loading incidencias', error);
    }
  }

  verResolucion(ct_id_incidencia: string) {
    this.router.navigate(['/ver_incidencias_completa', ct_id_incidencia]);
  }
  
}
