import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message.model';
import { MessagePost } from '../models/MessagePost.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  GetMessages(userId:number) {
    return this.http.get<Message[]>('api/Messages/GetMessages/'+ userId);
  }
  PostMessage(messagePost:MessagePost) {
    return this.http.post<MessagePost>('api/Messages/PostMessage', messagePost);
  }
}
