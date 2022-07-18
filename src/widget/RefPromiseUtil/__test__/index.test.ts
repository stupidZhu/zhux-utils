import RefPromiseUtil from "../RefPromiseUtil"

describe("RefPromiseUtil", () => {
  test("should be defined", () => {
    expect(RefPromiseUtil).toBeDefined()
  })

  const refPromiseUtil = new RefPromiseUtil()

  test("基本使用", () => {
    process.nextTick(() => {
      refPromiseUtil.setRef("hello", { hello: "world" })
    })
    return refPromiseUtil.addListener("hello").then(res => expect(res).toEqual({ hello: "world" }))
  })

  test("超时错误", async () => {
    setTimeout(() => {
      refPromiseUtil.setRef("timeout", { hello: "timeout" })
    }, 1000)

    await expect(refPromiseUtil.addListener("timeout", 500)).rejects.toThrowError(new Error("timeout"))
    return refPromiseUtil.addListener("timeout", 1500).then(res => expect(res).toEqual({ hello: "timeout" }))
  })
})
