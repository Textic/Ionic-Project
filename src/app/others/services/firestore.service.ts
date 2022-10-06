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

  updateCollection(path: string, id: string, data: any) {
    const collection = this.firestoreService.collection(path)
    return collection.doc(id).update(data);
  }

  setCollection(path: string, id: string, data: any) {
    const collection = this.firestoreService.collection(path)
    return collection.doc(id).set(data);
  }

  getCollection<type>(path: string) {
    const collection = this.firestoreService.collection<type>(path)
    return collection.valueChanges();
  }

  getCollectionById<type>(path: string, id: string) {
    const collection: AngularFirestoreCollection<type> = this.firestoreService.collection<type>(path)
    return collection.doc(id).valueChanges()
  }

  getCollectionByParameter<type>(path: string, key: string, value: string) {
    const collection: AngularFirestoreCollection<type> = this.firestoreService.collection<type>(path, e => e.where(key, '==', value));
    return collection.valueChanges()
  }

  getCollectionIdByParameter<type>(path: string, key: string, value: string) {
    const collection: AngularFirestoreCollection<type> = this.firestoreService.collection<type>(path, e => e.where(key, '==', value));
    collection.valueChanges({ idField: 'propertyId' }).subscribe(a => {
      for (var i = 0; i < length; i++) {
        const idField = a[i].propertyId
        localStorage.setItem('userId', idField)
      }
    })
  }
}
