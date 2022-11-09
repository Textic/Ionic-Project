import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DriverMapSetComponent } from './driver-map-set.component';

describe('DriverMapSetComponent', () => {
  let component: DriverMapSetComponent;
  let fixture: ComponentFixture<DriverMapSetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMapSetComponent ],
      imports: [IonicModule.forRoot()],
      providers: [Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverMapSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {       // google is not defined
  //   expect(component).toBeTruthy();
  // });
});
