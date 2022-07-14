import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InviteUserDialogComponent } from 'src/app/components/dialogs/invite-user-dialog/invite-user-dialog.component';
import { InvitedUser } from 'src/app/models/InvitedUser.model';
import { User } from 'src/app/models/User.model';
import { InvitedUserService } from 'src/app/services/invited-user.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  selectedUser:InvitedUser;
  invitedUsers$:Observable<InvitedUser[]>;
  constructor(public dialog: MatDialog,private invitedUserService:InvitedUserService) { }
  ngOnInit(): void {
    this.invitedUsers$=this.invitedUserService.GetAllInvitedUsers();

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
