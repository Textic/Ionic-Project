import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { PassTripsComponent } from './pass-trips.component';

describe('PassTripsComponent', () => {
  let component: PassTripsComponent;
  let fixture: ComponentFixture<PassTripsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PassTripsComponent ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PassTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
