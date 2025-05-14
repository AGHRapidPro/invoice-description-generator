import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Grant } from "../models/invoice-model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GrantsService {
  public grants$: Observable<Grant[]>;
  private apiUrl = 'http://localhost:3000/api/grants';

  constructor(private http: HttpClient) {
    this.grants$ = this.http.get<Grant[]>(this.apiUrl);
  }
  updateGrants(): Observable<Grant[]> {
    this.grants$ = this.http.get<Grant[]>(this.apiUrl);
    return this.grants$;
  }

  getGrant(id: number): Observable<Grant> {
    return this.http.get<Grant>(`${this.apiUrl}/${id}`);
  }

  addGrant(user: Omit<Grant, 'id'>): Observable<Grant> {
    return this.http.post<Grant>(this.apiUrl, user);
  }

  updateGrant(id: number, user: Partial<Grant>): Observable<Grant> {
    return this.http.put<Grant>(`${this.apiUrl}/${id}`, user);
  }

  deleteGrant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
