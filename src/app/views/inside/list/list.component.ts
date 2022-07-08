import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, concatWith, map, merge, mergeMap, subscribeOn } from 'rxjs';
import { CreateTeamComponent } from 'src/app/components/dialogs/create-team/create-team.component';
import { PTask } from 'src/app/models/PTask.model';
import { Team } from 'src/app/models/Team.model';
import { PTaskService } from 'src/app/services/ptask.service';
import { TeamService } from 'src/app/services/team.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { FormBuilder } from '@angular/forms';

export interface TableData {
  from: Date;
  to: Date;
  text:string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  StateTable:string[]=["ToDo","InProgress","Done"];

  data: TableData[] = [ { from: new Date(), to: new Date(),text:"some text" } ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['id', 'startDate', 'endDate','title', 'description', 'priorityId','stateId', 'teamId'];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ PTasks: this.rows });
  currentTeam: Team;
  
  constructor(private fb: FormBuilder,private pTaskService: PTaskService,private teamService: TeamService,public dialog: MatDialog, private route:Router) { 

  }

  ngOnInit() {
    this.teamService.currentTeam$.subscribe(res=>{this.currentTeam=res;}) ;

    //this.data2.forEach((d: PTask) => this.addRow(d, false));
    this.updateView();


    this.pTaskService.GetAllByTeamId(this.currentTeam.id).subscribe(PT=>{
      PT.forEach(element => {
      this.addRow(element);
    });
    });
    const myFormArray = <FormArray>this.form.get("PTasks");

  }

  
  testChange(row:FormGroup,index:number){

    if(!row.valid){return;}
 
    let updatePTask:PTask = {
      teamId: this.currentTeam.id,
      id: 0,
      startDate: undefined,
      endDate: undefined,
      title: '',
      description: '',
      priorityId: 0,
      stateId: 0,
      Performer: undefined
    }

    console.log(row.controls ,"row.controls")
    Object.keys(row.controls).forEach(key => {
      // console.log(key)
      // row.get(key).markAsDirty();
      if (key=="id") {updatePTask.id=row.get(key).value;}
      if (key=="startDate") {updatePTask.startDate=row.get(key).value;}
      if (key=="endDate") {updatePTask.endDate=row.get(key).value;}
      if (key=="title") {updatePTask.title=row.get(key).value;}
      if (key=="description") {updatePTask.description=row.get(key).value;}
      if (key=="priorityId") {updatePTask.priorityId=row.get(key).value;}
      if (key=="stateId") {updatePTask.stateId=row.get(key).value;}
      if (key=="teamId") {updatePTask.teamId=row.get(key).value;}
    });

    this.pTaskService.updatePTask(updatePTask).subscribe();
    this.dataSource.subscribe(res=>console.log(res))
  }
  GetIconPriorityId(value:number): string
  {
    //1=low
    //2=medium
    //3=high
    if (value==1) {
      return 'fa-solid fa-angle-down fa-xl';
    } else if (value == 2) {
      return 'fa-solid fa-bars fa-xl';
    } else if(value == 3){
      return 'fa-solid fa-angle-up fa-xl';
    }
      throw new Error('GetIconPriorityId internal error');
  }
  GetIconStateId(value:number): string
  {
    //1=ToDo
    //2=In Progress
    //3=Done
    if (value==1) {
      return 'ToDo';
    } else if (value == 2) {
      return 'InProgress';
    } else if(value == 3){
      return 'Done';
    }
      throw new Error('GetIconPriorityId internal error');
  }

  emptyTable() {
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
  }
  create(){
    let prePTask:PTask = {
      teamId: this.currentTeam.id,
      id: 0,
      startDate: undefined,
      endDate: undefined,
      title: '',
      description: '',
      priorityId: 0,
      stateId: 0,
      Performer: undefined
    }
    this.pTaskService.createPTask(prePTask).subscribe(res=>this.addRow(res))
  }
  addRow(d?: PTask, noUpdate?: boolean) {


     const row = this.fb.group({
        "id" : [d.id,[Validators.required]],
        "startDate":[d.startDate,[Validators.required]],
        "endDate": [d.endDate,[Validators.required]],
        "title": [d.title,[]],
        "description": [d.description,[]],
        "priorityId": [d.priorityId.toString(),[Validators.required]],
        "stateId": [d.stateId.toString(),[Validators.required]],
        "teamId": [d.teamId.toString(),[Validators.required]],
    });

    // const row = this.fb.group({
    //   'from'   : [d && d.from ? d.from : null, [Validators.required]],/// [d && d.from ? d.from : null, [validator....]]
    //   'to'     : [d && d.to   ? d.to   : null, []],
    //   'text'     : [d && d.text   ? d.text   : null, []],
    // });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);

    //this.dataSource.subscribe(re=>console.log("this.dataSource",re))
    //console.log("sdfsdfs",this.rows.controls,"this.rows.controls");
  }
}
