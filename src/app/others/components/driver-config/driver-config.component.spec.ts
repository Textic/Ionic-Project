import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { DriverConfigComponent } from './driver-config.component';

describe('DriverConfigComponent', () => {
  let component: DriverConfigComponent;
  let fixture: ComponentFixture<DriverConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverConfigComponent ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
