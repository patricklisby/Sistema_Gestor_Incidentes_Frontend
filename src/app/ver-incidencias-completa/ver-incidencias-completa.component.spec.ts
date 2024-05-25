import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerIncidenciasCompletaComponent } from './ver-incidencias-completa.component';

describe('VerIncidenciasCompletaComponent', () => {
  let component: VerIncidenciasCompletaComponent;
  let fixture: ComponentFixture<VerIncidenciasCompletaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerIncidenciasCompletaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerIncidenciasCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
