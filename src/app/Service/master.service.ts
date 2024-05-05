import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }



  getAllTaskList():Observable<any>{
    return this.http.get<any>(environment.RES_TEST.GET_ALL);
  }


  // getAllTaskList():Observable<ApiResponseModel>{
  //   return this.http.get<ApiResponseModel>(this.apiUrl + 'GetAllTaskList');
  // }

  addNewTask(obj:Task):Observable<any>{
    return this.http.post<any>(environment.RES_TEST.SAVE,obj);
  }

  updateTask(obj:Task):Observable<any>{
    return this.http.put<any>(environment.RES_TEST.UPDATE_BY_ID+obj.id,obj);
  }

  deleteTask(item: Task):Observable<any>{
    return this.http.delete<any>(environment.RES_TEST.DELETE_BY_ID+item.id);
  }

  


  
}
