export class CPV {
  public row: string;
  public id: string;
  public name: string;
  public pricePln: string;
  public priceEur: string;

  constructor(options: any) {
    this.row = options?.lp?.toString() || "";
    this.id = options?.code || "";
    this.name = options?.name || "";
    this.pricePln = options?.price_pln || "";
    this.priceEur = options?.price_eur || "";
  }
}

export class CPVCategory {
  public name: string;
  public items: CPV[] = [];

  constructor(options: any) {
    this.name = options?.category || "";

    if (options?.list?.length > 0) {
      options?.list.forEach((i: any) => {
        this.items.push(new CPV(i));
      });
    }
  }
}
