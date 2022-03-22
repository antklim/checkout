import { expect } from "chai"
import "mocha"
import { Checkout, CatalogItem, catalog } from "."

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