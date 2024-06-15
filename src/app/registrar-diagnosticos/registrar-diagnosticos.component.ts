import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticosService } from '../services/diagnosticos.service';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrar-diagnosticos',
  templateUrl: './registrar-diagnosticos.component.html',
  styleUrls: ['./registrar-diagnosticos.component.scss'],
})
export class RegistrarDiagnosticosComponent implements OnInit {
  diagnosticoForm: FormGroup;
  ct_id_incidencia: string;
  photos: string[] = [];
  userId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private diagnosticosService: DiagnosticosService, 
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Inyecta AuthService
  ) {
    this.ct_id_incidencia = '';
    this.diagnosticoForm = this.fb.group({
      ct_diagnostico: ['', Validators.required],
      cn_tiempo_estimado_reparacion: ['', Validators.required],
      ct_observaciones: ['', Validators.required],
      ct_id_incidencia: ['', Validators.required],
      cn_id_usuario: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ct_id_incidencia = params.get('ct_id_incidencia') ?? '';
      this.diagnosticoForm.patchValue({ ct_id_incidencia: this.ct_id_incidencia });
    });

    this.userId = this.authService.getUserInfo().userId; // Obtiene el ID del usuario logueado
    console.log('User ID obtenido:', this.userId); // Verificar el ID obtenido
    if (this.userId) {
      this.diagnosticoForm.patchValue({ cn_id_usuario: this.userId });
    } else {
      console.log("No hay sesión");
    }
  }

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

  async onSubmit() {
    if (this.diagnosticoForm.valid) {
      const { ct_diagnostico, cn_tiempo_estimado_reparacion, ct_observaciones, ct_id_incidencia, cn_id_usuario } = this.diagnosticoForm.value;

      if (this.photos.length > 0) {
        const formData = new FormData();
        formData.append('ct_diagnostico', ct_diagnostico);
        formData.append('cn_tiempo_estimado_reparacion', cn_tiempo_estimado_reparacion);
        formData.append('ct_observaciones', ct_observaciones);
        formData.append('ct_id_incidencia', ct_id_incidencia);
        formData.append('cn_id_usuario', cn_id_usuario.toString());
        
        this.photos.forEach((photo, index) => {
          formData.append('images', this.dataURLtoBlob(photo));
        });

        try {
          await this.diagnosticosService.registrar_diagnosticos(formData);
          const successToast = await this.toastController.create({
            message: 'Diagnóstico registrado con éxito',
            duration: 1500,
            position: 'top',
            color: 'success'
          });
          await successToast.present();
          this.navigateToIncidencias(ct_id_incidencia);
        } catch (error: any) {
          console.error('Error al registrar el diagnóstico:', error);
          const errorToast = await this.toastController.create({
            message: 'Error al registrar el diagnóstico',
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

  navigateToIncidencias(ct_id_incidencia: string) {
    this.router.navigate(['/ver_incidencias_completa', ct_id_incidencia]);
  }

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
