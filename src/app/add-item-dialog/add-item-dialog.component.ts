import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule, MatDialogRef,
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {GrantPosition, InvoiceItem} from "../invoice-model";
import {CPVCategory} from "../cpv-model";

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatDialogActions,
    MatDialogModule,
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.css'
})

export class AddItemDialogComponent {
  public invoiceItem: InvoiceItem = new InvoiceItem({});
  public cpvList: CPVCategory[] = [];
  public grantPositions: GrantPosition[] = [];

  public cpvCategorySelected: any = null;

  constructor(public dialogRef: MatDialogRef<AddItemDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cpvList = data.cpvList;
    this.grantPositions = data.grantPositions;
  }

  onNoClick(): void {
  }

}
