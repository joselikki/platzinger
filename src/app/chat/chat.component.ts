import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friendId: any;
  constructor(private activatedRoute: ActivatedRoute) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId)
  }

  ngOnInit() {
  }

}
