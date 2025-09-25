import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule , RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { GrantPosition, InvoiceItem } from "../models/invoice-model";
import { CPV } from "../models/cpv-model";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { map , Observable, startWith } from "rxjs";

@Component({
  selector: 'app-add-edit-item-dialog',
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
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ],
  templateUrl: './add-edit-item-dialog.component.html',
  styleUrl: './add-edit-item-dialog.component.css'
})

export class AddEditItemDialogComponent implements OnInit {
  public invoiceItem: InvoiceItem = new InvoiceItem({});
  public cpvList: CPV[] = [];
  public cpvListFiltered: Observable<CPV[]>;
  public grantPositions: GrantPosition[] = [];
  public cpvSelectedFC = new FormControl();

  constructor(public dialogRef: MatDialogRef<AddEditItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cpvList = data.cpvList;
    this.cpvListFiltered = data.cpvList;
    this.grantPositions = data.grantPositions;
    if (data.invoiceItem) {
      this.invoiceItem = data.invoiceItem;
      this.cpvSelectedFC.setValue(this.invoiceItem.cpv);
    }
  }

  ngOnInit() {
    this.cpvListFiltered = this.cpvSelectedFC.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  public displayFn(category: CPV): string {
    return category ? category.name : '';
  }

  private _filter(value: string): CPV[] {
    const filterValue = value.toString().toLowerCase();
    return this.cpvList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public onOptionSelected(event: any) {
    this.invoiceItem.cpv = event.option.value;
  }

  protected readonly Number = Number;
}
