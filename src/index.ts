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
  apply(): number
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
