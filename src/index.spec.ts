import { expect } from "chai"
import "mocha"
import { hello } from "."

describe("hello", () => {
  it("uses 'world' by default", () => {
    const want = "Hello world!"
    const got = hello()
    expect(got).to.eq(want)
  })

  it("uses provided noun", () => {
    const want = "Hello mom!"
    const got = hello("mom")
    expect(got).to.eq(want)
  })
})