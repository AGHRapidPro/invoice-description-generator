import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
  title = 'invoice-generator';

  public documentTypeFC: FormControl  = new FormControl();
  public vatNumberFC: FormControl  = new FormControl('');
  public proformaNumberFC: FormControl  = new FormControl('');
  public purposeFC: FormControl  = new FormControl('');
  public basisFC: FormControl  = new FormControl('');
  public grantFC: FormControl  = new FormControl('');
  public categoryFC: FormControl  = new FormControl('');
  public subcategoryFC: FormControl  = new FormControl('');

  private data: any = products;
  public prelimList: any = [];
  public selectedItems: any = [];

  ngOnInit() {
    this.prelimList = this.data.default;
  }

  public addItem() {
    this.selectedItems.push(this.subcategoryFC.value);
    this.categoryFC.setValue(null);
    this.subcategoryFC.setValue(null);
  }

  public deleteItem(item: any) {
    this.selectedItems = this.selectedItems.filter((i: any) => i != item);
  }

}
