import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asignar-incidencias',
  templateUrl: './asignar-incidencias.component.html',
  styleUrls: ['./asignar-incidencias.component.scss'],
})
export class AsignarIncidenciasComponent  implements OnInit {

  tecnicos = [
    { id: 1, nombre: 'Técnico 1', seleccionado: false },
    { id: 2, nombre: 'Técnico 2', seleccionado: false },
    // Agrega más técnicos según sea necesario
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  asignarTecnicos() {
    const tecnicosSeleccionados = this.tecnicos.filter(tecnico => tecnico.seleccionado);
    this.modalController.dismiss(tecnicosSeleccionados);
  }

}
