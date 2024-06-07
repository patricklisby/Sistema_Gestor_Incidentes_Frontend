import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciasService } from '../services/incidencias.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-incidencias',
  templateUrl: './registrar-incidencias.component.html',
  styleUrls: ['./registrar-incidencias.component.scss'],
})
export class RegistrarIncidenciasComponent implements OnInit {
  incidenciaForm: FormGroup;
  selectedFile: File | null = null; // Inicializar selectedFile con null

  constructor(
    private fb: FormBuilder, 
    private incidenciasService: IncidenciasService, 
    private toastController: ToastController,
    private router: Router // Inyecta el Router aquí
  ) {
    this.incidenciaForm = this.fb.group({
      ct_titulo_incidencia: ['', Validators.required],
      ct_descripcion_incidencia: ['', Validators.required],
      ct_lugar: ['', Validators.required],
      cn_id_usuario_registro: [''], // Considera usar un valor dinámico si es necesario
      image: [null, Validators.required]
    });
  }

  ngOnInit() {}

  onFileSelected(event: any) { // Tipar explícitamente el parámetro event
    this.selectedFile = event.target.files[0];
    this.incidenciaForm.patchValue({ image: this.selectedFile });
  }

  async onSubmit() {
    if (this.incidenciaForm.valid) {
      const { ct_titulo_incidencia, ct_descripcion_incidencia, ct_lugar, cn_id_usuario_registro } = this.incidenciaForm.value;
      if (this.selectedFile) { // Verificar si selectedFile no es null
        try {
          await this.incidenciasService.registrar_incidencia(ct_titulo_incidencia, ct_descripcion_incidencia, ct_lugar, cn_id_usuario_registro, this.selectedFile);
          console.log('Incidencia registrada con éxito');
          const successToast = await this.toastController.create({
            message: 'Incidencia registrada con éxito',
            duration: 1500,
            position: 'top',
            color: 'success'
          });
          await successToast.present();
          
          // Navegar a la ruta 'ver_incidencias' después del éxito
          this.router.navigate(['/ver_incidencias']);
        } catch (error) {
          console.error('Error al registrar la incidencia:', error);
          const errorToast = await this.toastController.create({
            message: 'Error al registrar la incidencia',
            duration: 1500,
            position: 'top',
            color: 'danger'
          });
          await errorToast.present();
        }
      } else {
        console.log('No se ha seleccionado ningún archivo');
        const noFileToast = await this.toastController.create({
          message: 'Por favor, seleccione un archivo',
          duration: 1500,
          position: 'top',
          color: 'warning'
        });
        await noFileToast.present();
      }
    } else {
      console.log('Formulario no válido');
      const invalidFormToast = await this.toastController.create({
        message: 'Por favor, complete todos los campos requeridos',
        duration: 1500,
        position: 'top',
        color: 'warning'
      });
      await invalidFormToast.present();
    }
  }

  navigateToIncidencias() {
    this.router.navigate(['/ver_incidencias']);
  }
}
