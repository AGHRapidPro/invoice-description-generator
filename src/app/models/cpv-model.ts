export class CPV {
  public row: string;
  public id: string;
  public name: string;
  public pricePln: string;
  public priceEur: string;
  public category: string;

  constructor(options: any) {
    this.row = options?.lp?.toString() || "";
    this.id = options?.code || "";
    this.name = options?.name || "";
    this.category = options?.category || "";
    this.pricePln = options?.price_pln || "";
    this.priceEur = options?.price_eur || "";
  }
}
