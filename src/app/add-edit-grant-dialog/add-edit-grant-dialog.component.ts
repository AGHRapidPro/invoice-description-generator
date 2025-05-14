import { Component, Inject } from '@angular/core';
import { Grant } from "../models/invoice-model";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-add-edit-grant-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './add-edit-grant-dialog.component.html',
  styleUrl: './add-edit-grant-dialog.component.css'
})
export class AddEditGrantDialogComponent {
  public grant = new Grant({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.grant = data.grant;
    }
  }
}
