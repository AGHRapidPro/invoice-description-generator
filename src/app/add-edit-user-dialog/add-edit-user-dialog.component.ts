import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Recipient } from "../models/invoice-model";

@Component({
  selector: 'app-add-edit-user-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatDialogClose
  ],
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrl: './add-edit-user-dialog.component.css'
})
export class AddEditUserDialogComponent {
  public user = new Recipient({});

  constructor(public dialogRef: MatDialogRef<AddEditUserDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.user = data?.user;
    }
  }

  public isUserValid(): boolean {
    if (!this.user.name) {
      return false;
    }
    if (!this.user.lastname) {
      return false;
    }
    if (this.user.index.length !== 6) {
      return false;
    }
    if (this.user.account.length !== 32) {
      console.log('account invalid')
      return false;
    }

    return true;
  }

  public accountChange() {
    if ([2, 7, 12, 17, 22, 27].includes(this.user.account.length)) {
      this.user.account += ' ';
    }
  }
}
