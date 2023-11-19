import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { User } from './user.service';
import { Department } from './department.service';
import { Equipment } from './equipment.service';
import { Category } from './category.service';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private readonly _http: HttpClient) { }

  findAll(): Observable<Issue[]> {
    return this._http.get<Issue[]>(`${URLAPI}/issue`);
  }

  findNewToday(): Observable<Issue[]> {
    return this._http.get<Issue[]>(`${URLAPI}/issue/new-today`);
  }

  findProceeding(): Observable<Issue[]> {
    return this._http.get<Issue[]>(`${URLAPI}/issue/proceeding`);
  }

  findWaitForClose(): Observable<Issue[]> {
    return this._http.get<Issue[]>(`${URLAPI}/issue/wait-for-close`);
  }

  findCompleted(): Observable<Issue[]> {
    return this._http.get<Issue[]>(`${URLAPI}/issue/completed`);
  }

  findCancelled(): Observable<Issue[]> {
    return this._http.get<Issue[]>(`${URLAPI}/issue/cancelled`);
  }

  findOne(id: number): Observable<Issue> {
    return this._http.get<Issue>(`${URLAPI}/issue/${id}`);
  }

  save(payload: Issue): Observable<any> {
    if(payload.id == 0) {
      return this._http.post(`${URLAPI}/issue/`, payload);
    }

    return this._http.put(`${URLAPI}/issue/${payload.id}`, payload);
  }

}

export interface Issue {
    id: number;
    type: number;
    code: string;
    created: Date;
    department?: Department;
    building?: string;
    floor?: string;
    location?: string;
    caller: string;
    phoneno: string;
    equipment?: Equipment;
    category?: Category;
    description: string;
    cause: string;
    solution: string;
//    parts?: Part[];
    tech?: User;
    satisfication?: number;
    lastModifiedDate?: Date;
    finishedDate?: Date;
    status: number;
}
