import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  createRequest(request){
    const cleanEmail = request.recieverEmail.replace('.', ',')
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender).set(request)
  }
  setRequestStatus(request, status){
    const cleanEmail = request.receiverEmail.replace('.', ',')
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender + '/status').set(status)
  }
  getRequestForEmail(email){
    const cleanEmail = email.replace('.', ',')
    return this.angularFireDatabase.list('request/' + cleanEmail)

  }
}
