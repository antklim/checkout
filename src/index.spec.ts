import { expect } from "chai"
import "mocha"
import { Checkout, CatalogItem, AppleTVDeal, catalog } from "."

describe("Checkout", () => {
  it("adds items to checkout", () => {
    const co = new Checkout()
    co.scan(catalog.ipd)
    co.scan(catalog.mbp)

    const want: ReadonlyArray<CatalogItem> = [
      { SKU: "ipd", Name: "Super iPad", Price: 54999 },
      { SKU: "mbp", Name: "MacBook Pro", Price: 139999 },
    ]
    const got = co.basket()
    expect(got).to.eql(want)
  })

  it("calculates total without pricing rules", () => {
    const co = new Checkout()
    co.scan(catalog.ipd)
    co.scan(catalog.mbp)

    const want: number = 194998
    const got = co.total()
    expect(got).to.eql(want)
  })
})

describe("AppleTVDeal", () => {
  it("calculates discount based on 3 for 2 deal", () => {
    const deal = new AppleTVDeal()

    const basket1: ReadonlyArray<CatalogItem> = [catalog.atv]
    const discount1: number = 0
    const got1 = deal.apply(basket1)
    expect(got1).to.eql(discount1)

    const basket2: ReadonlyArray<CatalogItem> = [catalog.atv, catalog.atv]
    const discount2: number = 0
    const got2 = deal.apply(basket2)
    expect(got2).to.eql(discount2)

    const basket3: ReadonlyArray<CatalogItem> = [catalog.atv, catalog.atv, catalog.atv]
    const discount3: number = 10950
    const got3 = deal.apply(basket3)
    expect(got3).to.eql(discount3)

    const basket4: ReadonlyArray<CatalogItem> = [catalog.atv, catalog.atv, catalog.atv, catalog.atv]
    const discount4: number = 10950
    const got4 = deal.apply(basket4)
    expect(got4).to.eql(discount4)

    const basket5: ReadonlyArray<CatalogItem> = [catalog.atv, catalog.atv, catalog.atv, catalog.atv, catalog.atv, catalog.atv]
    const discount5: number = 21900
    const got5 = deal.apply(basket5)
    expect(got5).to.eql(discount5)
  })
})