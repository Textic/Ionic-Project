import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { ProfileUpdatePage } from './profile-update.page';

describe('ProfileUpdatePage', () => {
  let component: ProfileUpdatePage;
  let fixture: ComponentFixture<ProfileUpdatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUpdatePage ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
