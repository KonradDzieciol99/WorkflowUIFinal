import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { InviteUserDialogComponent } from 'src/app/components/dialogs/invite-user-dialog/invite-user-dialog.component';
import { InvitedUser } from 'src/app/models/InvitedUser.model';
import { Message } from 'src/app/models/Message.model';
import { MessagePost } from 'src/app/models/MessagePost.model';
import { User } from 'src/app/models/User.model';
import { InvitedUserService } from 'src/app/services/invited-user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  // private CurrentTeamSource = new ReplaySubject<InvitedUser>(1);
  // currentTeam$ = this.CurrentTeamSource.asObservable()
  // private SelectedUserSource = new ReplaySubject<InvitedUser>(1);
  // selectedUser$ = this.SelectedUserSource.asObservable()
  selectedUser:InvitedUser;
  messageContent: string;
  invitedUsers$:Observable<InvitedUser[]>;
  messages$:Observable<Message[]>;
  @ViewChild('messageForm') messageForm: NgForm;
  constructor(private messageService:MessageService ,public dialog: MatDialog,private invitedUserService:InvitedUserService) { }
  ngOnInit(): void {
    this.invitedUsers$=this.invitedUserService.GetAllInvitedUsers();
  }
  SelectUser(userSelected:InvitedUser){
    this.selectedUser = userSelected;
    this.GetMessages(userSelected.id);
  }
  GetMessages(userSelectedId:number){

    this.messages$=this.messageService.GetMessages(userSelectedId);
    this.messages$.subscribe(res=>{});

  }
  sendMessage() {
    let messagePost:MessagePost= {
      content: this.messageContent,
      recipientId: this.selectedUser.id
    };

    this.messageService.PostMessage(messagePost).subscribe((res) => {
      console.log(res);
      this.messageForm.reset();
    });
  }
  addPerson()
  {
    this.openDialog();
  }
  openDialog(): void {
    const dialogPosition: DialogPosition = {
      top: '15%',
    };
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      maxHeight: '70vh',
      position: dialogPosition
    });

    dialogRef.afterClosed().subscribe(()=>{ })

  }



}
