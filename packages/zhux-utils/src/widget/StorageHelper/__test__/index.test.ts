import StorageHelper from "../StorageHelper"

describe("StorageHelper", () => {
  test("should be defined", () => {
    expect(StorageHelper).toBeDefined()
  })

  const storageHelper = new StorageHelper("TEST")

  afterEach(() => {
    localStorage.clear()
  })

  test("基本 api 的使用", () => {
    expect(storageHelper.getItem("HELLO")).toBeNull()
    expect(storageHelper.getItem("HELLO", { hello: "world" })).toEqual({ hello: "world" })

    storageHelper.setItem("HELLO", { hello: "hello" })
    expect(storageHelper.getItem("HELLO", { hello: "world" })).toEqual({ hello: "hello" })

    storageHelper.removeItem("HEllO")
    expect(storageHelper.getItem("HELLO")).toEqual({ hello: "hello" })

    storageHelper.removeItems(["HELLO"])
    expect(storageHelper.getItem("HELLO")).toBeNull()

    storageHelper.setItem("A", "a")
    storageHelper.clear()
    expect(storageHelper.length).toBe(0)
  })

  test("和 localStorage 的兼容性", () => {
    localStorage.setItem("HELLO", JSON.stringify({ hello: "HELLO" }))
    localStorage.setItem("TEST_HELLO", JSON.stringify({ hello: "TEST_HELLO" }))
    localStorage.setItem("TEST_HELLO_EXP", JSON.stringify({ hello: "TEST_HELLO_EXP", _expire: [1] }))

    expect(storageHelper.getItem("HELLO")).toEqual({ hello: "TEST_HELLO" })
    expect(storageHelper.getItem("HELLO_EXP")).toEqual({ hello: "TEST_HELLO_EXP", _expire: [1] })
  })

  test("过期时间", () => {
    // 1640966400000
    jest.useFakeTimers().setSystemTime(new Date("2022-01-01 00:00:00"))

    storageHelper.setItem("EXP_1S", { hello: "EXP_1S" }, 1000)
    storageHelper.setItem("EXP_1M", { hello: "EXP_1M" }, { minutes: 1 })

    expect(storageHelper.getItem("EXP_1S")).toEqual({ hello: "EXP_1S" })
    expect(storageHelper.getItem("EXP_1M")).toEqual({ hello: "EXP_1M" })

    jest.advanceTimersByTime(1001)
    expect(storageHelper.getItem("EXP_1S")).toBeNull()
    expect(storageHelper.getItem("EXP_1M")).toEqual({ hello: "EXP_1M" })

    jest.advanceTimersByTime(59 * 1000)
    expect(storageHelper.getItem("EXP_1M")).toBeNull()
  })
})
