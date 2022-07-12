import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable, observable, of, Subject } from 'rxjs';
import { InvitedUserService } from 'src/app/services/invited-user.service';
import { InvitedUser } from 'src/app/models/InvitedUser.model';

@Component({
  selector: 'app-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.css']
})
export class InviteUserDialogComponent implements OnInit {

  private searchTerms = new Subject<string>();
  selectedUser:InvitedUser;
  public isSelected = false;
  public resoultExsit:string='';
  InvitedUsers$ = new Observable<InvitedUser[]>;
  constructor(private invitedUserService : InvitedUserService ,public dialogRef: MatDialogRef<InviteUserDialogComponent>,) { }

  form = new FormGroup({
    SearchField: new FormControl(''),
  });
   
  ngOnInit(): void {
    this.form.controls['SearchField'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(val=>{this.searchTerms.next(val);});
    
    this.InvitedUsers$=this.searchTerms.pipe(
      switchMap(val=>{
        if(val.length>0){return this.invitedUserService.FindUser(val);}
        else{return of([]);}
      })
    );
    
    this.InvitedUsers$.subscribe(val=>{
      console.log(val)
      if(val.length>0){
        this.resoultExsit='alert alert-danger';
      }
      else{
        this.resoultExsit='';
      }
    })
    

    // .subscribe(val=>{
    //   this.InvitedUsers$=this.invitedUserService.FindUser(val);
    //   console.log(val);
    // })
  }

  onNoClick(): void {
    // console.log("wp");
    this.dialogRef.close();
  }

  select(invitedUser:InvitedUser):void
  {
    this.selectedUser=invitedUser;
    this.form.controls['SearchField'].setValue('');
    // this.isSelected=!this.isSelected;
  }
}
