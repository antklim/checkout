export type CatalogItem = {
  SKU: string;
  Name: string;
  Price: number;
}

export type Catalog = {
  [key: string]: CatalogItem
}

export const catalog: Catalog = {
  "ipd": { SKU: "ipd", Name: "Super iPad", Price: 54999 },
  "mbp": { SKU: "mbp", Name: "MacBook Pro", Price: 139999 },
  "atv": { SKU: "atv", Name: "Apple TV", Price: 10950 },
  "vga": { SKU: "vga", Name: "VGA adapter", Price: 3000 },
}

interface PricingRule {
  // returns discount amount
  apply(items: ReadonlyArray<CatalogItem>): number
}

export class AppleTVDeal implements PricingRule {
  apply(items: readonly CatalogItem[]): number {
    const appleTVs = items.filter((item) => item.SKU === "atv")
    const discountNum = Math.floor(appleTVs.length / 3)
    return discountNum * catalog.atv.Price
  }
}

export class IPadBulkDeal implements PricingRule {
  apply(items: readonly CatalogItem[]): number {
    return 0
  }
}

export class Checkout {
  readonly pricingRules: PricingRule[];
  items: Array<CatalogItem>;

  constructor(pricingRules?: PricingRule[]) {
    if (pricingRules !== undefined) {
      this.pricingRules = pricingRules
    } else {
      this.pricingRules = []
    }
    this.items = []
  }

  scan(item: CatalogItem): void {
    this.items.push(item)
  }

  basket(): ReadonlyArray<CatalogItem> {
    return this.items
  }

  total(): number {
    // TODO: apply pricing rules to total
    return this.items.reduce((sum, item) => sum + item.Price, 0)
  }
}
