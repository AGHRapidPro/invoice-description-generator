import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { AddItemDialogComponent } from "../add-item-dialog/add-item-dialog.component";
import { Grant, InvoiceDocVAT, InvoiceItem, Recipient } from "../models/invoice-model";
import { CPVCategory } from "../models/cpv-model";
import { Alignment, Margins, TableCell } from "pdfmake/interfaces";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as products from '../../config/sample.json';
import * as grants from '../../config/grant.json';
import * as receivers from '../../config/receivers.json';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-main-panel',
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
      MatHeaderCell,
      MatColumnDef,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatTable,
      MatHeaderCellDef,
      MatCellDef,
      MatHeaderRowDef,
      MatRowDef,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent {
  private data: any = products;
  private grants: any = grants;
  private receivers: any = receivers;

  public prelimList: CPVCategory[] = [];
  public grantList: Grant[] = [];
  public recipientsList: Recipient[] = [];
  public contractBasis = ['zamówienie poniżej 130 000 zł w zw. z art. 30 ust. 4 PZP', 'umowa przetargowa', 'umowa ogólnouczelniana']

  public invoiceDocument: InvoiceDocVAT = new InvoiceDocVAT({});
  displayedColumns: string[] = ['name', 'cpvRow', 'cpvId', 'cpvName', 'invoicePosition', 'preliminaryId'];
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<InvoiceItem>();

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
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: {
        cpvList: this.prelimList,
        grantPositions: this.invoiceDocument.financeGrant.positions
      },
      minWidth: '800px',
    });

    dialogRef.afterClosed().subscribe((item: InvoiceItem) => {
      if (item) {
        const groupWithItem = this.invoiceDocument.items.find(i => i.cpv === item.cpv);
        if (groupWithItem) {
          groupWithItem.invoicePosition += ', ' + item.invoicePosition;
          groupWithItem.name += ', ' + item.name;
          this.dataSource.data = this.invoiceDocument.items;
        } else {
          this.invoiceDocument.items.push(item);
          this.dataSource.data = this.invoiceDocument.items;
        }
      }
    });
  }

  public getInvoiceNumberText() {
    const itemsText = this.invoiceDocument.items.map(item => item.name).join(', ');
    return "Faktura VAT nr " + this.invoiceDocument.invoiceNumber + " za: " + itemsText;
  }

  public generateItemsTable(): any {
    const headers = [
      { text: 'Wiersz', style: 'tableHeader'},
      { text: 'Kod CPV', style: 'tableHeader' },
      { text: 'Nazwa CPV', style: 'tableHeader' },
      { text: 'Pozycje z faktury', style: 'tableHeader' },
      { text: 'Numer pozycji wg preliminarza', style: 'tableHeader' }
    ];

    const items =  this.invoiceDocument.items.map((item: InvoiceItem) =>
      [item.cpv.row, item.cpv.id, item.cpv.name, item.invoicePosition, item.preliminaryId]
    );
    return [headers, ...items];
  }

  public generatePdf() {
    var dd = {
      content: [
        {
          text: 'Załącznik nr 4 do Regulaminu konkursu Grant Rektora',
          style: 'header',
          margin: [0, 20, 20, 0] as Margins
        },
        {
          text: this.getInvoiceNumberText(),
          style: 'subheader',
          margin: [0, 20, 20, 20] as Margins
        },
        {
          text: 'Podstawa udzielenia zamówienia',
          style: 'subheader',
          margin: [0, 0] as Margins
        },
        {
          text: this.invoiceDocument.contractBasis,
        },
        {
          text: 'Kody CPV:',
          style: 'subheader',
          margin: [0, 10] as Margins,
        },
        {
          table: {
            body: this.generateItemsTable() as TableCell[][]
          }
        },
        {
          text: 'Finansowanie: 500-613-818 Granty FNKS',
          style: 'subheader',
          margin: [0, 10, 0, 0] as Margins,
        },
        {
          text: 'Dotyczy preliminarza nr: ' + this.invoiceDocument.financeGrant.code,
          margin: [0, 0, 0, 20] as Margins,
        },
        'W przypadku płatności gotówkowych proszę podać:',
        {
          text: '1. Imię i nazwisko: ' + this.invoiceDocument.recipient.name + ' ' + this.invoiceDocument.recipient.lastname
        },
        {
          text: '2. Numer indeksu: ' + this.invoiceDocument.recipient.index
        },
        {
          text: '3. Nr konta studenta do zwrotu należności: ' + this.invoiceDocument.recipient.account
        },
        {
          text: 'Pieczątka i podpis\nopiekuna Koła Naukowego',
          style: 'footer'
        }
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: false,
          margin: [0, 0, 0, 10] as Margins,
          alignment: "right" as Alignment
        },
        subheader: {
          fontSize: 12,
          bold: true,
        },
        footer: {
          fontSize: 12,
          alignment: "right" as Alignment,
          margin: [0, 100, 50, 0] as Margins
        },
        tableHeader: {
          bold: true,
          alignment: "center" as Alignment
        }
      }
    }

    pdfMake.createPdf(dd).download("invoiceVAT.pdf");

  }
}
