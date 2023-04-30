import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private http: HttpClient) {}

  public getDashData(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/dash/data?userId=${userId}`);
  }
}
