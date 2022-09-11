import RefPromiseHelper from "../RefPromiseHelper"

describe("RefPromiseHelper", () => {
  test("should be defined", () => {
    expect(RefPromiseHelper).toBeDefined()
  })

  const refPromiseHelper = new RefPromiseHelper()

  test("基本使用", () => {
    process.nextTick(() => {
      refPromiseHelper.setRef("hello", { hello: "world" })
    })
    return refPromiseHelper.addListener("hello").then(res => expect(res).toEqual({ hello: "world" }))
  })

  test("超时错误", async () => {
    setTimeout(() => {
      refPromiseHelper.setRef("timeout", { hello: "timeout" })
    }, 1000)

    await expect(refPromiseHelper.addListener("timeout", 500)).rejects.toThrowError(new Error("timeout"))
    return refPromiseHelper.addListener("timeout", 1500).then(res => expect(res).toEqual({ hello: "timeout" }))
  })
})
