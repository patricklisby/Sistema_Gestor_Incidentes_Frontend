import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registrar Incidencias', url: '/folder/inbox', icon: 'add' },
    { title: 'Ver Incidencias', url: '/folder/outbox', icon: 'eye' },
    { title: 'Gestionar Incidencias', url: '/folder/favorites', icon: 'extension-puzzle' },
    { title: 'Gestionar Sistema', url: '/folder/apps', icon: 'apps' },
  ];
  constructor() {}
}
