import {Component, Inject, inject, OnInit} from '@angular/core';
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
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";

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
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.css'
})

export class AddItemDialogComponent implements OnInit {
  public invoiceItem: InvoiceItem = new InvoiceItem({});
  public cpvList: CPVCategory[] = [];
  public cpvListFiltered: Observable<CPVCategory[]>;
  public grantPositions: GrantPosition[] = [];
  public myControl = new FormControl();

  public cpvCategorySelected: any = null;

  constructor(public dialogRef: MatDialogRef<AddItemDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cpvList = data.cpvList;
    this.cpvListFiltered = data.cpvList;
    this.grantPositions = data.grantPositions;
  }

  ngOnInit() {
    this.cpvListFiltered = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  public displayFn(category: CPVCategory): string {
    return category ? category.name : '';
  }

  private _filter(value: string): { name: string; items: any[] }[] {
    const filterValue = value.toString().toLowerCase();
    return this.cpvList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public onOptionSelected(event: any) {
    this.cpvCategorySelected = event.option.value;
  }

}
