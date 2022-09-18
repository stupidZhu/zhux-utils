import ListenValueHelper from "../ListenValueHelper"

describe("ListenValueHelper", () => {
  test("should be defined", () => {
    expect(ListenValueHelper).toBeDefined()
  })

  const listenValueHelper = new ListenValueHelper()

  test("基本使用", () => {
    process.nextTick(() => {
      listenValueHelper.setValue("hello", { hello: "world" })
    })
    return listenValueHelper.addListener("hello").then(res => expect(res).toEqual({ hello: "world" }))
  })

  test("超时错误", async () => {
    setTimeout(() => {
      listenValueHelper.setValue("timeout", { hello: "timeout" })
    }, 1000)

    await expect(listenValueHelper.addListener("timeout", 500)).rejects.toThrowError(new Error("timeout"))
    return listenValueHelper.addListener("timeout", 1500).then(res => expect(res).toEqual({ hello: "timeout" }))
  })
})
