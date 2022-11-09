import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { DriverPage } from './driver.page';

describe('DriverPage', () => {
  let component: DriverPage;
  let fixture: ComponentFixture<DriverPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
