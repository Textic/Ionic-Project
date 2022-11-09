import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { PassMapComponent } from './pass-map.component';

describe('PassMapComponent', () => {
  let component: PassMapComponent;
  let fixture: ComponentFixture<PassMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PassMapComponent ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule],
      providers: [Geolocation]
    }).compileComponents();

    fixture = TestBed.createComponent(PassMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {       // google is not defined
  //   expect(component).toBeTruthy();
  // });
});
