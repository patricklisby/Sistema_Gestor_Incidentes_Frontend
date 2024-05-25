import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticosService } from '../services/diagnosticos.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registrar-diagnosticos',
  templateUrl: './registrar-diagnosticos.component.html',
  styleUrls: ['./registrar-diagnosticos.component.scss'],
})
export class RegistrarDiagnosticosComponent implements OnInit {
  diagnosticoForm: FormGroup;
  ct_id_incidencia: string;

  constructor(
    private fb: FormBuilder, 
    private diagnosticosService: DiagnosticosService, 
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ct_id_incidencia = '';
    this.diagnosticoForm = this.fb.group({
      ct_diagnostico: ['', Validators.required],
      cn_tiempo_estimado_reparacion: ['', Validators.required],
      ct_observaciones: ['', Validators.required],
      ct_id_incidencia: ['', Validators.required],
      cn_id_usuario: ['1'] // Considera usar un valor dinámico si es necesario
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ct_id_incidencia = params.get('ct_id_incidencia') ?? '';
      // Asigna el valor de ct_id_incidencia al control en el FormGroup
      this.diagnosticoForm.patchValue({ct_id_incidencia: this.ct_id_incidencia});
    });
  }

  async onSubmit() {
    if (this.diagnosticoForm.valid) {
      const { ct_diagnostico, cn_tiempo_estimado_reparacion, ct_observaciones, ct_id_incidencia, cn_id_usuario } = this.diagnosticoForm.value;
      //console.log("Diagnostico: "+ct_diagnostico+ "\n"+"Tiempo: "+cn_tiempo_estimado_reparacion+ "\n" +"Observacion: "+ct_observaciones+ "\n"+"Id Inicidencia: "+ct_id_incidencia+ "\n"+"id usuario: "+cn_id_usuario+ "\n");
      try {
        // Llama al servicio para registrar el diagnóstico
       const result =  await this.diagnosticosService.registrar_diagnosticos(ct_diagnostico, cn_tiempo_estimado_reparacion, ct_observaciones, ct_id_incidencia, cn_id_usuario);
        console.log(result);
        
        console.log('Diagnóstico registrado con éxito');
        
        // Muestra un mensaje de éxito
        const successToast = await this.toastController.create({
          message: 'Diagnóstico registrado con éxito',
          duration: 1500,
          position: 'top',
          color: 'success'
        });
        await successToast.present();
        this.navigateToIncidencias(ct_id_incidencia);
      } catch (error: any) { // Añade ": any" para especificar que error es de tipo any
        console.error('Error al registrar el diagnóstico:', error);
        
        // Muestra un mensaje de error
        const errorToast = await this.toastController.create({
          message: 'Error al registrar el diagnóstico',
          duration: 1500,
          position: 'top',
          color: 'danger'
        });
        await errorToast.present();
      }
    } else {
      // Si el formulario no es válido, muestra un mensaje
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
  
  

  navigateToIncidencias(ct_id_incidencia: string) {
    this.router.navigate(['/ver_incidencias_completa', ct_id_incidencia]);
  }
}
