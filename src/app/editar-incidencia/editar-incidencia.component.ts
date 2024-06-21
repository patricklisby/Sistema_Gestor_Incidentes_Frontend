import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciasService } from '../services/incidencias.service';
import { UsuariosService } from '../services/usuarios.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-editar-incidencia',
  templateUrl: './editar-incidencia.component.html',
  styleUrls: ['./editar-incidencia.component.scss'],
})
export class EditarIncidenciaComponent implements OnInit {
  incidenciaForm: FormGroup;
  incidenciaId: string = '';

  estados: any[] = [];
  prioridades: any[] = [];
  riesgos: any[] = [];
  afectaciones: any[] = [];
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private incidenciasService: IncidenciasService,
    private usuariosService: UsuariosService,
    private location: Location,
    private toastController: ToastController // Inyectar ToastController
  ) {
    this.incidenciaForm = this.fb.group({
      ct_titulo_incidencia: ['', Validators.required],
      ct_descripcion_incidencia: ['', Validators.required],
      ct_lugar: ['', Validators.required],
      cf_fecha_completa_incidencia: ['', Validators.required],
      cn_id_estado: ['', Validators.required],
      ct_justificacion_incidencia: [''],
      cn_id_prioridad: [''],
      cn_id_riesgo: [''],
      cn_id_afectacion: [''],
      cn_id_categoria: [''],
      cn_monto_compra_materiales: [''],
      cn_duracion_reparacion: [''],
      cn_id_usuario_registro: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('ct_id_incidencia');
    if (id) {
      this.incidenciaId = id;
      this.loadIncidencia();
    } else {
      console.error('No se proporcionó un ID de incidencia');
    }

    this.loadDropdownData();
  }

  async loadIncidencia() {
    try {
      const incidencia = await this.incidenciasService.mostrar_incidencias_por_id(this.incidenciaId);
      this.incidenciaForm.patchValue(incidencia);
    } catch (error) {
      console.error('Error al cargar la incidencia:', error);
    }
  }

  async loadDropdownData() {
    try {
      this.estados = await this.usuariosService.obtenerEstados();
      this.prioridades = await this.usuariosService.obtenerPrioridades();
      this.riesgos = await this.usuariosService.obtenerRiesgos();
      this.afectaciones = await this.usuariosService.obtenerAfectaciones();
      this.categorias = await this.usuariosService.obtenerCategorias();
    } catch (error) {
      console.error('Error al cargar los datos desplegables:', error);
    }
  }

  async onSubmit() {
    if (this.incidenciaForm.invalid) {
      return;
    }

    try {
      await this.incidenciasService.editar_incidencia(this.incidenciaId, this.incidenciaForm.value);
      this.showToast('Incidencia editada exitosamente', 'success');
      this.router.navigate([`/ver_incidencias_completa/${this.incidenciaId}`]);
    } catch (error) {
      console.error('Error al editar la incidencia:', error);
      this.showToast('Error al editar la incidencia', 'danger');
    }
  }

  onCancel() {
    this.location.back();
  }

  // Método para mostrar toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
