import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friendId: any;
  friend: User;
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];  //brings id params in url
    
    this.userService.getUserById(this.friendId).valueChanges().subscribe(
      (data: User)=>{
        this.friend = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  
  }

  ngOnInit() {
  }

}
