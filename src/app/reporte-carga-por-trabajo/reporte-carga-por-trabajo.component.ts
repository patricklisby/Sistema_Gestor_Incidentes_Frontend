import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Chart, ChartConfiguration, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reporte-carga-por-trabajo',
  templateUrl: './reporte-carga-por-trabajo.component.html',
  styleUrls: ['./reporte-carga-por-trabajo.component.scss'],
})
export class ReporteCargaPorTrabajoComponent implements OnInit {
  reportData: any[] = [];
  incidenciasTerminadas: any[] = [];
  charts: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.obtenerReporteCargaTrabajo();
  }

  async obtenerReporteCargaTrabajo() {
    try {
      this.reportData = await this.usuariosService.obtenerReporteCargaTrabajo();
      this.incidenciasTerminadas = this.reportData.reduce((acc: any[], data: any) => acc.concat(data.incidenciasTerminadas || []), []);
      this.generarGraficas();
    } catch (error) {
      console.error('Error al obtener reporte de carga de trabajo:', error);
    }
  }

  generarGraficas() {
    setTimeout(() => { // Ensures the canvas elements are rendered before creating charts
      this.reportData.forEach((data, index) => {
        this.generarGrafica(data, index);
      });
    }, 0);
  }

  generarGrafica(data: any, index: number) {
    const doughnutChartId = `doughnut-canvas-${index}`;
    const barChartId = `bar-canvas-${index}`;

    const doughnutChartData: ChartData<'doughnut'> = {
      labels: ['Total Incidencias', 'Incidencias Terminadas'],
      datasets: [{
        data: [data.total_incidencias, data.total_incidencias_terminadas],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }]
    };

    const barChartData: ChartData<'bar'> = {
      labels: [data.nombre],
      datasets: [{
        label: 'Promedio Tiempo de Reparación (horas)',
        data: [data.promedio_tiempo_reparacion],
        backgroundColor: '#FFCE56',
        borderColor: '#FFCE56',
        borderWidth: 1
      }]
    };

    const chartOptions: ChartOptions<'doughnut' | 'bar'> = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    };

    const doughnutCanvas = document.getElementById(doughnutChartId) as HTMLCanvasElement;
    if (doughnutCanvas) {
      const doughnutCtx = doughnutCanvas.getContext('2d');
      if (doughnutCtx) {
        this.charts[index] = new Chart(doughnutCtx, {
          type: 'doughnut',
          data: doughnutChartData,
          options: chartOptions
        });
      }
    }

    const barCanvas = document.getElementById(barChartId) as HTMLCanvasElement;
    if (barCanvas) {
      const barCtx = barCanvas.getContext('2d');
      if (barCtx) {
        this.charts[index + this.reportData.length] = new Chart(barCtx, {
          type: 'bar',
          data: barChartData,
          options: chartOptions
        });
      }
    }
  }
}
