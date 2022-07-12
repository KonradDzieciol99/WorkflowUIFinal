import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InviteUserDialogComponent } from 'src/app/components/dialogs/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  addPerson()
  {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '300px',
      maxHeight: '70vh'
    });

    dialogRef.afterClosed().subscribe(()=>{ })

  }



}
