import {Component, Inject} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { GrantPosition } from "../models/invoice-model";
import { AddEditGrantDialogComponent } from "../add-edit-grant-dialog/add-edit-grant-dialog.component";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-add-edit-grant-position-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogActions
  ],
  templateUrl: './add-edit-grant-position-dialog.component.html',
  styleUrl: './add-edit-grant-position-dialog.component.css'
})
export class AddEditGrantPositionDialogComponent {
  public position = new GrantPosition({});

  constructor(public dialogRef: MatDialogRef<AddEditGrantDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.position = data?.position;
    }
  }
}
