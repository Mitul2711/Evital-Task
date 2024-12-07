import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, tap } from 'rxjs';
import { Firestore, arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  authfire = inject(AngularFireAuth)
  constructor(private firestore: AngularFirestore) { }


  get isAuthenticated():Observable<boolean> {
    return this.authfire.authState.pipe(
      map(user => user !== null) // `authState` returns null if not authenticated
    );
  }

  signUp(user: any): Observable<any> {
    // this.spinner.show();
    return from(this.authfire.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      tap(() => {
        // setTimeout(() => {
        //   this.spinner.hide();
        // }, 2000);
      }, error => {
        // this.toasterService.toast('Error occurred', 'error');
      })
    );
  }

  signIn(user: any): Observable<any> {
    // this.spinner.show();
    return from(this.authfire.signInWithEmailAndPassword(user.email, user.password)).pipe(
      tap(() => {
      
      }, error => {
        // this.toasterService.toast('Error occurred', 'error');
      })
    );
  }

  logOut() {
    this.authfire.currentUser = null
    this.authfire.signOut()
  }

  async addPatient(patientId: string) {
    try {
      const user = await this.authfire.currentUser;
  
      if (user) {
        const userId = user.uid;
  
        const patientsDocRef = this.firestore
          .collection('users')
          .doc(userId)
          .collection('patientId')
          .doc('patientList');
  
        await patientsDocRef.set(
          {
            patientIds: arrayUnion(patientId),
          },
          { merge: true }
        );
  
        // console.log(`Patient ID ${patientId} added to the array successfully!`);
      } else {
        // console.error('No user logged in!');
      }
    } catch (error) {
      // console.error('Error adding patient ID:', error);
    }
  }


  async addMedicineCart(medicineid: any) {
    console.log('medicineid',medicineid);
    
    try {
      const user = await this.authfire.currentUser;
  
      if (user) {
        const userId = user.uid;
  
        const patientsDocRef = this.firestore
          .collection('users')
          .doc(userId)
          .collection('medicineId')
          .doc('medicineList');
  
        await patientsDocRef.set(
          {
            medicineId: arrayUnion(medicineid),
          },
          { merge: true }
        );
  
        console.log(`Patient ID ${medicineid} added to the array successfully!`);
      } else {
        console.error('No user logged in!');
      }
    } catch (error) {
      console.error('Error adding patient ID:', error);
    }
  }

  async getPatientIds() {
    try {
      const userId = localStorage.getItem("userId");
  
      if (userId) {
  
        const patientsDocRef = this.firestore
          .collection('users')
          .doc(userId)
          .collection('patientId')
          .doc('patientList');
  
        const docSnapshot = await patientsDocRef.get().toPromise();
  
        if (docSnapshot?.exists) {
          const data = docSnapshot.data();
          return data?.['patientIds'] || [];
        } else {
          console.log('No patient data found.');
          return [];
        }
      } else {
        console.error('No user logged in!');
        return [];
      }
    } catch (error) {
      console.error('Error fetching patient IDs:', error);
      return [];
    }
  }

  
  async getMedicinesIds() {
    try {
     
      const user = await this.authfire.currentUser;
  
      if (user) {
        const userId = user.uid;
  
        const patientsDocRef = this.firestore
          .collection('users')
          .doc(userId)
          .collection('medicineId')
          .doc('medicineList');
  
        const docSnapshot = await patientsDocRef.get().toPromise();
  
        if (docSnapshot?.exists) {
          const data = docSnapshot.data();
          
          return data?.['medicineId'] || [];
        } else {
          // console.log('No patient data found.');
          return [];
        }
      } else {
        // console.error('No user logged in!');
        return [];
      }
    } catch (error) {
      // console.error('Error fetching patient IDs:', error);
      return [];
    }
  }


  async deleteMedicineId(medicineid: any) {
    try {
      const user = await this.authfire.currentUser;
  
      if (user) {
        const userId = user.uid;
  
        const db = getFirestore();
        const patientsDocRef = doc(db, 'users', userId, 'medicineId', 'medicineList');
  
        // Use modular Firestore syntax
        await updateDoc(patientsDocRef, {
          medicineId: arrayRemove(medicineid),
        });
  
        console.log(`Medicine ID ${medicineid} deleted successfully!`);
      } else {
        console.error('No user logged in!');
      }
    } catch (error) {
      console.error('Error deleting medicine ID:', error);
    }
  }
  
  

}

type SignUp = {
  email: string; password: string;
}
