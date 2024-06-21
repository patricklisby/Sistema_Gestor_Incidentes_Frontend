import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciasService } from '../services/incidencias.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrar-incidencias',
  templateUrl: './registrar-incidencias.component.html',
  styleUrls: ['./registrar-incidencias.component.scss'],
})
export class RegistrarIncidenciasComponent implements OnInit {
  incidenciaForm: FormGroup;
  photos: string[] = [];
  userId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private incidenciasService: IncidenciasService, 
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService // Inyecta AuthService
  ) {
    // Inicializa el formulario reactivo con validadores
    this.incidenciaForm = this.fb.group({
      ct_titulo_incidencia: ['', Validators.required],
      ct_descripcion_incidencia: ['', Validators.required],
      ct_lugar: ['', Validators.required],
      cn_id_usuario_registro: [''],
    });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Obtiene el ID del usuario logueado y lo asigna al formulario.
   */
  ngOnInit() {
    this.userId = this.authService.getUserInfo().userId; // Obtiene el ID del usuario logueado
    console.log('User ID obtenido:', this.userId); // Verificar el ID obtenido
    if (this.userId) {
      this.incidenciaForm.patchValue({ cn_id_usuario_registro: this.userId });
    } else {
      console.log("No hay sesión");
    }
  }

  /**
   * Toma una foto usando la cámara y la añade al array de fotos.
   */
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    if (image.dataUrl) {
      this.photos.push(image.dataUrl);
    }
  }

  /**
   * Envía el formulario para registrar una nueva incidencia.
   * Si el formulario es válido, llama al servicio de incidencias para registrar la incidencia junto con las fotos.
   * Muestra mensajes de éxito o error mediante un toast.
   */
  async onSubmit() {
    if (this.incidenciaForm.valid) {
      const { ct_titulo_incidencia, ct_descripcion_incidencia, ct_lugar, cn_id_usuario_registro } = this.incidenciaForm.value;

      if (this.photos.length > 0) {
        const formData = new FormData();
        formData.append('ct_titulo_incidencia', ct_titulo_incidencia);
        formData.append('ct_descripcion_incidencia', ct_descripcion_incidencia);
        formData.append('ct_lugar', ct_lugar);
        formData.append('cn_id_usuario_registro', cn_id_usuario_registro.toString());
        
        this.photos.forEach((photo, index) => {
          formData.append('images', this.dataURLtoBlob(photo)); // Asegúrate de usar 'images'
        });

        try {
          await this.incidenciasService.registrar_incidencia(formData);
          const successToast = await this.toastController.create({
            message: 'Incidencia registrada con éxito',
            duration: 1500,
            position: 'top',
            color: 'success'
          });
          await successToast.present();
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
        const noFileToast = await this.toastController.create({
          message: 'Por favor, tome al menos una foto',
          duration: 1500,
          position: 'top',
          color: 'warning'
        });
        await noFileToast.present();
      }
    } else {
      const invalidFormToast = await this.toastController.create({
        message: 'Por favor, complete todos los campos requeridos',
        duration: 1500,
        position: 'top',
        color: 'warning'
      });
      await invalidFormToast.present();
    }
  }

  /**
   * Navega a la página de visualización de incidencias.
   */
  navigateToIncidencias() {
    this.router.navigate(['/ver_incidencias']);
  }

  /**
   * Convierte una URL de datos a un objeto Blob.
   * @param dataurl La URL de datos a convertir.
   * @returns Un objeto Blob.
   */
  private dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error('Invalid data URL');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
