import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private http: HttpClient) {}

  public getDashData(userId: any): Observable<any> {
    return this.http.get("");
  }
}
