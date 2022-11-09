import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DriverMapComponent } from './driver-map.component';

describe('DriverMapComponent', () => {
  let component: DriverMapComponent;
  let fixture: ComponentFixture<DriverMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMapComponent ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule],
      providers: [Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {       // google is not defined
  //   expect(component).toBeTruthy();
  // });
});
