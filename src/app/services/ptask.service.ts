import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTask } from '../models/AppTask.model';

@Injectable({
  providedIn: 'root'
})
export class PTaskService {



  constructor(private http: HttpClient) { }
  
  GetAllByTeamId(id:number) {
    return this.http.get<AppTask[]>('api/AppTasks/GetAllByTeamId/'+id);
  }
  CreateAppTask(prePTask:AppTask) {
    return this.http.post<AppTask>('api/AppTasks/CreatePTask',prePTask);
  }
  UpdateAppTask(updatePTask: AppTask) {
    return this.http.put<AppTask>('api/AppTasks/UpdatePTask',updatePTask);  }
  }
