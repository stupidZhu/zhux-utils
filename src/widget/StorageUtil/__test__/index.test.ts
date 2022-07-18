import StorageUtil from "../StorageUtil"

describe("StorageUtil", () => {
  test("should be defined", () => {
    expect(StorageUtil).toBeDefined()
  })

  const storageUtil = new StorageUtil("TEST")

  afterEach(() => {
    localStorage.clear()
  })

  test("基本 api 的使用", () => {
    expect(storageUtil.getItem("HELLO")).toBeNull()
    expect(storageUtil.getItem("HELLO", { hello: "world" })).toEqual({ hello: "world" })

    storageUtil.setItem("HELLO", { hello: "hello" })
    expect(storageUtil.getItem("HELLO", { hello: "world" })).toEqual({ hello: "hello" })

    storageUtil.removeItem("HEllO")
    expect(storageUtil.getItem("HELLO")).toEqual({ hello: "hello" })

    storageUtil.removeItems(["HELLO"])
    expect(storageUtil.getItem("HELLO")).toBeNull()

    storageUtil.setItem("A", "a")
    storageUtil.clear()
    expect(storageUtil.length).toBe(0)
  })

  test("和 localStorage 的兼容性", () => {
    localStorage.setItem("HELLO", JSON.stringify({ hello: "HELLO" }))
    localStorage.setItem("TEST_HELLO", JSON.stringify({ hello: "TEST_HELLO" }))
    localStorage.setItem("TEST_HELLO_EXP", JSON.stringify({ hello: "TEST_HELLO_EXP", _expire: [1] }))

    expect(storageUtil.getItem("HELLO")).toEqual({ hello: "TEST_HELLO" })
    expect(storageUtil.getItem("HELLO_EXP")).toEqual({ hello: "TEST_HELLO_EXP", _expire: [1] })
  })

  test("过期时间", () => {
    // 1640966400000
    jest.useFakeTimers().setSystemTime(new Date("2022-01-01 00:00:00"))

    storageUtil.setItem("EXP_1S", { hello: "EXP_1S" }, 1000)
    storageUtil.setItem("EXP_1M", { hello: "EXP_1M" }, { minutes: 1 })

    expect(storageUtil.getItem("EXP_1S")).toEqual({ hello: "EXP_1S" })
    expect(storageUtil.getItem("EXP_1M")).toEqual({ hello: "EXP_1M" })

    jest.advanceTimersByTime(1001)
    expect(storageUtil.getItem("EXP_1S")).toBeNull()
    expect(storageUtil.getItem("EXP_1M")).toEqual({ hello: "EXP_1M" })

    jest.advanceTimersByTime(59 * 1000)
    expect(storageUtil.getItem("EXP_1M")).toBeNull()
  })
})
