import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversationId: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false;
  

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private conversationService: ConversationService,
              private authenticationService: AuthenticationService) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];  //brings id params in url
    
   
      this.authenticationService.getStatus().subscribe(
        (session)=>{
          this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) =>{
            this.user = user;

            this.userService.getUserById(this.friendId).valueChanges().subscribe(
              (data: User) => {
                this.friend = data;
                
                const ids = [
                  this.user.uid,
                  this.friend.uid
                ].sort()
                this.conversationId = ids.join('|')
                this.getConversation()
              }, (error) => {
                console.log(error)
              }
            )
          })
        }, 
        (error)=>{
        console.log(error)
      })
  }

  ngOnInit() {
  }

  //Send text message

  sendMessage(){
    const message = {
      uid: this.conversationId ,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      reciever: this.friend.uid,
      type: 'text'
    }
    this.conversationService.createConversation(message).then(()=>{
      this.textMessage = '';
    });
  }

  // Zumbido message
  sendZumbido() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      reciever: this.friend.uid,
      type: 'zumbido'
    }
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido()
    this.shake = true
    window.setTimeout(()=>{
      this.shake = false
    }, 1000)
  }

  // Zumbido
  doZumbido(){
    const audio = new Audio('assets/sound/zumbido.m4a')
    audio.play()
  }

  // get messages
  getConversation(){
    this.conversationService.getConversation(this.conversationId).valueChanges().subscribe(
    (data)=>{
      this.conversation = data
      this.conversation.forEach((message)=>{
        if(!message.seen){
          message.seen = true;
          this.conversationService.editConversation(message)
          if(message.type === 'text'){
            const audio = new Audio('assets/sound/new_message.m4a')
            audio.play()
          } else if (message.type === 'zumbido') {
            this.doZumbido();
          }
        }
      })
    }, 
    (error)=>{
      console.log(error)
    })
  }

  //Who is the user
  getUserNickByID(id){
    if(id === this.friend.uid){
      return this.friend.nick
    } else {
      return this.user.nick
    }
  }

}
