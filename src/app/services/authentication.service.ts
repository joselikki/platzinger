//User Authentication 

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }
  // Login with email service
  loginWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  // Register with email service
  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus(){
    return this.angularFireAuth.authState;
  }
  // Log out service
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }
}
