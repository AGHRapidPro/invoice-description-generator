import { Component } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { Recipient } from "../models/invoice-model";
import * as receivers from '../../config/receivers.json';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  private receivers: any = receivers;
  displayedColumns: string[] = ['name', 'lastname', 'index', 'account', 'edit', 'delete'];
  dataSource: Recipient[] = [];

  constructor() {
    this.receivers.default.forEach((user: any) => {
      this.dataSource.push(new Recipient(user));
    });
  }



}
