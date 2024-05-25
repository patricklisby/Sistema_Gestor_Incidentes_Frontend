import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-incidencias',
  templateUrl: './registrar-incidencias.component.html',
  styleUrls: ['./registrar-incidencias.component.scss'],
})
export class RegistrarIncidenciasComponent implements OnInit {
  incidenciaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.incidenciaForm = this.fb.group({
      ct_titulo_incidencia: ['', Validators.required],
      ct_descripcion_incidencia: ['', Validators.required],
      ct_lugar: ['', Validators.required],
      cn_id_imagen: [null] // Puedes añadir validaciones si lo deseas
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.incidenciaForm.valid) {
      const { ct_titulo_incidencia, ct_descripcion_incidencia, ct_lugar, cn_id_imagen } = this.incidenciaForm.value;
      try {
        // Llamar a tu servicio para registrar la incidencia
        // await this.servicio.registrar_incidencia(ct_titulo_incidencia, ct_descripcion_incidencia, ct_lugar, cn_id_imagen);
      } catch (error) {
        console.error('Error al registrar la incidencia:', error);
      }
    } else {
      // Mostrar mensajes de error o tomar alguna acción
    }
  }
}
