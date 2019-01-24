import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  //Get all users
  getUsers(){
    return this.angularFireDatabase.list('/users');
  }
  // Get user by id
  getUserById(uid){
    return this.angularFireDatabase.object('/users/' + uid);
  }

  //Create new user
  createUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  //Modify existing user
  editUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  //upload user avatar 
  setAvatar(avatar, uid) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }
}
