import { Injectable } from '@angular/core';
import { Recipient } from "../models/invoice-model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users$: Observable<Recipient[]>;
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<Recipient[]>(this.apiUrl);
  }
  getUsers(): Observable<Recipient[]> {
    return this.http.get<Recipient[]>(this.apiUrl);
  }

  getUser(id: number): Observable<Recipient> {
    return this.http.get<Recipient>(`${this.apiUrl}/${id}`);
  }

  addUser(user: Omit<Recipient, 'id'>): Observable<Recipient> {
    return this.http.post<Recipient>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<Recipient>): Observable<Recipient> {
    return this.http.put<Recipient>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
