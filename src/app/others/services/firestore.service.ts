import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
  
export class FirestoreService {

  constructor(private firestoreService: AngularFirestore) { }

  getId() {
    return this.firestoreService.createId();
  }

  deleteCollection(path: string, id: string) {
    const collection = this.firestoreService.collection(path)
    return collection.doc(id).delete();
  }

  updateColletion(path: string, id: string, data: any) {
    const collection = this.firestoreService.collection(path)
    return collection.doc(id).update(data);
  }

  setColletion(path: string, id: string, data: any) {
    const collection = this.firestoreService.collection(path)
    return collection.doc(id).set(data);
  }

  getCollection<type>(path: string) {
    const collection = this.firestoreService.collection<type>(path)
    return collection.valueChanges();
  }

  getCollectionById(path: string, id: string) {
    const collection = this.firestoreService.collection(path)
    return collection.doc(id).valueChanges()
  }

  getCollectionByParameter<type>(path: string, parameter: string, value: string) {
    const collection: AngularFirestoreCollection<type> = this.firestoreService.collection<type>(path, e => e.where(parameter, '==', value));
    return collection.valueChanges()
  }
}
