import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvitedUser } from '../models/InvitedUser.model';

@Injectable({
  providedIn: 'root'
})
export class InvitedUserService {

  constructor(private http: HttpClient) { }

  GetAllInvitedUsers() {
    return this.http.get<InvitedUser[]>('api/Invitations/GetAllInvitedUsers');
  }
  FindUser(email:string) {
    return this.http.get<InvitedUser[]>('api/Invitations/FindUser/'+ email);
  }
  InviteUser(idOfInvitedUser:number) {
    return this.http.post<InvitedUser[]>('api/Invitations/InviteUser',idOfInvitedUser);
  }

  
}
