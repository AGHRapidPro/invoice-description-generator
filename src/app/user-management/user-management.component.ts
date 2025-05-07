import { Component, inject } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { Recipient } from "../models/invoice-model";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { AddEditUserDialogComponent } from "../add-edit-user-dialog/add-edit-user-dialog.component";
import { UsersService } from "../services/users.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
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
      minWidth: '800px',
    });

    dialogRef.afterClosed().subscribe((user) => {
      this.userService.updateUser(user.id, user).subscribe((res) =>
        console.log('user updated with result:', res)
      );
    });
  }

  public deleteUser(user: Recipient) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.deleteUser(Number(user.id)).subscribe(() =>
          console.log('user with id:', user, 'was deleted')
        );
      }
    });
  }

  public addNewUser() {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      minWidth: '800px',
    });

    dialogRef.afterClosed().subscribe((user) => {
      this.userService.addUser(user).subscribe((res) =>
        console.log('user added:', res)
      );
    });
  }
}
