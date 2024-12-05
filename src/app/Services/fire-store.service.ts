import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  authfire = inject(AngularFireAuth)
  constructor() { }


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
        // setTimeout(() => {
        //   this.spinner.hide();
        // }, 2000);
      }, error => {
        // this.toasterService.toast('Error occurred', 'error');
      })
    );
  }

  logOut() {
    this.authfire.currentUser = null
    this.authfire.signOut()
  }


}

type SignUp = {
  email: string; password: string;
}
