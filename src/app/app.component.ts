import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatOptionModule} from "@angular/material/core";
import * as products from '../config/sample.json';
import * as grants from '../config/grant.json';
import * as receivers from '../config/receivers.json';
import {MatDialog} from "@angular/material/dialog";
import {AddItemDialogComponent} from "./add-item-dialog/add-item-dialog.component";
import {Grant, InvoiceDocVAT, Recipient} from "./invoice-model";
import {CPVCategory} from "./cpv-model";


@Component({
  selector: 'app-root',
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
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  private data: any = products;
  private grants: any = grants;
  private receivers: any = receivers;

  public prelimList: CPVCategory[] = [];
  public grantList: Grant[] = [];
  public recipientsList: Recipient[] = [];

  public selectedItems: any = [];
  public invoiceDocument: InvoiceDocVAT = new InvoiceDocVAT({});

  readonly dialog = inject(MatDialog);

  ngOnInit() {
    const preliminaryData = this.data.default;
    preliminaryData.forEach((c: any) => {
      this.prelimList.push(new CPVCategory(c));
    });

    const grantData = this.grants.default;
    grantData.grants.forEach((g: any) => {
      this.grantList.push(new Grant(g));
    });

    const receiversData = this.receivers.default;
    receiversData.forEach((r: any) => {
      this.recipientsList.push(new Recipient(r));
    });
  }

  public addItem() {
    const dialogRef = this.dialog.open(AddItemDialogComponent);
  }

  public deleteItem(item: any) {
    this.selectedItems = this.selectedItems.filter((i: any) => i != item);
  }

  protected readonly console = console;
}
