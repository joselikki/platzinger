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
  friends: User[];
  friend: User;
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.friends = this.userService.getFriends();
    
    this.friend = this.friends.find(record =>{
      return record.uid == this.friendId;
    });
    console.log(this.friend)
  }

  ngOnInit() {
  }

}
