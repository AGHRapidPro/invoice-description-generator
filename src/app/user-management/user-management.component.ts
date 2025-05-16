import { Component, inject } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { Recipient } from "../models/invoice-model";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { AddEditUserDialogComponent } from "../add-edit-user-dialog/add-edit-user-dialog.component";
import { UsersService } from "../services/users.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  displayedColumns: string[] = ['name', 'lastname', 'index', 'account', 'edit', 'delete'];
  dataSource: Recipient[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private userService: UsersService) {
    this.userService.users$.subscribe(users => {
      this.dataSource = users;
    });
  }

  public editUser(user: Recipient) {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      data: {
        user: user,
      },
      minWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.userService.updateUser(user.id, user).subscribe(x => {
          this.userService.updateUsers().subscribe(users => {
            this.dataSource = users;
          });
        });
      }
    });
  }

  public deleteUser(user: Recipient) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        deleteLabel: 'użytkownika' + ' ' + user.name + ' ' + user.lastname,
      },
      minWidth: '400px',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.deleteUser(Number(user.id)).subscribe(x => {
          this.userService.updateUsers().subscribe(users => {
            this.dataSource = users;
          });
        });
      }
    });
  }

  public addNewUser() {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      minWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.userService.addUser(user).subscribe(x => {
          this.userService.updateUsers().subscribe(users => {
            this.dataSource = users;
          });
        });
      }
    });
  }
}
