import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrarDiagnosticosComponent } from './registrar-diagnosticos.component';

describe('RegistrarDiagnosticosComponent', () => {
  let component: RegistrarDiagnosticosComponent;
  let fixture: ComponentFixture<RegistrarDiagnosticosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarDiagnosticosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarDiagnosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
