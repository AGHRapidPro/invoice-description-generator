import { CPV } from "./cpv-model";

export class InvoiceItem {
  public name: string;
  public cpv: CPV;
  public invoicePosition: string;
  public preliminaryId: string;

  constructor(options: any) {
    this.name = options?.name || "";
    this.cpv = options?.cpv || new CPV({});
    this.invoicePosition = options?.invoicePosition || "";
    this.preliminaryId = options?.preliminaryId || "";
  }
}

export class GrantPosition {
  public id: string;
  public alias: string;
  public budget: number;

  constructor(options: any) {
    this.id = options.position_id || "";
    this.alias = options.alias || "";
    this.budget = options.budget || 0;
  }
}

export class Grant {
  public id: string;
  public alias: string;
  public positions: GrantPosition[] = [];

  constructor(options: any) {
    this.id = options.grant_id || "";
    this.alias = options.alias || "";

    options?.positions.forEach((p: any) => {
      this.positions.push(new GrantPosition(p));
    });
  }
}

export class Recipient {
  public name: string;
  public lastname: string;
  public index: string;
  public account: string;

  constructor(options: any) {
    this.name = options.name || "";
    this.lastname = options.lastname || "";
    this.index = options.index || "";
    this.account = options.account || "";
  }
}

export class InvoiceDocVAT {
  public invoiceNumber: string;
  public contractBasis: string;
  public items: InvoiceItem[] = [];
  public financeGrant: Grant;
  public preliminaryPosition: GrantPosition;
  public recipient: Recipient;

  constructor(options: any) {
    this.invoiceNumber = options.invoiceNumber || "";
    this.contractBasis = options.contractBasis || "";
    this.financeGrant = options.financeGrant || null;
    this.preliminaryPosition = options.preliminaryPosition || null;
    this.recipient = options.recipient || null;
    this.items = options.items || [];
  }
}
