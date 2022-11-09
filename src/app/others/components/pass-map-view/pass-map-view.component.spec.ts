import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { PassMapViewComponent } from './pass-map-view.component';

describe('PassMapViewComponent', () => {
  let component: PassMapViewComponent;
  let fixture: ComponentFixture<PassMapViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PassMapViewComponent ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PassMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {       // google is not defined
  //   expect(component).toBeTruthy();
  // });
});
