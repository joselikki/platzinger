import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  user: User;
  query: string = '';
  closeResult: string;
  friendEmail: string;

  constructor( private userService: UserService,
               private authenticationService: AuthenticationService,
               private router: Router,
               private modalService: NgbModal,
               private requestService: RequestsService) {
    // Get a friend list service
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[])=>{
        this.friends = data
      }, 
      (error)=>{ 
      console.log(error)}
      ); 

      this.authenticationService.getStatus().subscribe(
        (status)=>{
          this.userService.getUserById(status.uid).valueChanges().subscribe(
            (data: User)=>{
              this.user = data
            }, 
            (error)=>{
              console.log(error)
            }
          )
        },
        (error)=>{
          console.log(error)
        }
        )
  }

  ngOnInit() {
  }
  logout(){
    this.authenticationService.logOut().then(()=>{
      alert("sesion cerrada")
      this.router.navigate(['login']);

    }).catch(error=>{
      console.log(error)
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
  }

  sendRequest(){
    const request = {
      timestampt : Date.now(),
      recieverEmail: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }
    return this.requestService.createRequest(request).then(()=>{
      alert('Solicitud enviada')
    }).catch((error)=>{
      alert('Hubo un error')
      console.log(error)
    })
  }
}
