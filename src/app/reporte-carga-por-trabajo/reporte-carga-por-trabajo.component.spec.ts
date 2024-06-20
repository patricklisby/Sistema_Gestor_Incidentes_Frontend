import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteCargaPorTrabajoComponent } from './reporte-carga-por-trabajo.component';

describe('ReporteCargaPorTrabajoComponent', () => {
  let component: ReporteCargaPorTrabajoComponent;
  let fixture: ComponentFixture<ReporteCargaPorTrabajoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCargaPorTrabajoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteCargaPorTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
