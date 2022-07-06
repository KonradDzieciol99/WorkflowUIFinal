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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','symbol2'];
  data2:PTask[]
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
    // myFormArray.controls

    //     myFormArray.controls.forEach(control=>{
    //   control.valueChanges.subscribe(value => console.log(value));
    // });

    // myFormArray.valueChanges.pipe(map((z:AbstractControl, index: number)=> ({ rowIndex: index,control: z})  ))
    // .subscribe(res=>console.log(res));

    // myFormArray.valueChanges.subscribe(res=>console.log(res));
    


    // controls.forEach(control=>{
    //   control.valueChanges.subscribe(value => console.log(value));
    // });
    
    // .map((control: AbstractControl, index: number)=>
    // control.valueChanges.subscribe(changes => {
    // console.log(changes,"plus index", index);
    // }));



    //formGroupName
    //console.log(myFormArray);




    
  //   .valueChanges.pipe().
  //   subscribe((value) => {
  //     console.log("myFormArrayvalue = ",value);
  //  });
  //  const myFormArray2 = <FormArray>this.form.get("dates");
  //  console.log(myFormArray2);
   //<FormArray>this.form.get("dates").
  //   this.form.valueChanges.subscribe((value:FormGroup) => {
  //     console.log("form = ",
  //                 JSON.stringify(value));
  //  });
   //merge
   //merge(myFormArray.controls.map(control=>{control.valueChanges})).subscribe(res=>console.log(res));
  //  .subscribe((value:FormGroup) => {
  //   console.log("form = ",
  //               JSON.stringify(value));
//  });
   //console.log(myFormArray,"myFormArray")
  }

  
  testChange(row:FormGroup,index:number){
    console.log(index,row);
    console.log(row.controls['priorityId'].value,"priorityId")

    const myFormArray = <FormArray>this.form.get("PTasks");
    console.log(myFormArray.controls)
    
    this.rows.push(row);
    this.dataSource.subscribe(val=>console.log(val,"dataSource"))
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
        "title": [d.title,[Validators.required]],
        "description": [d.description,[Validators.required]],
        "priorityId": [d.priorityId,[Validators.required]],
        "stateId": [d.stateId,[Validators.required]],
        "teamId": [d.teamId,[Validators.required]],
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
