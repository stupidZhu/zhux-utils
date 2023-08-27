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

    storageHelper.setItem("HELLO", { hello: "hello" })
    expect(storageHelper.getItem("HELLO")).toEqual({ hello: "hello" })

    storageHelper.removeItem("HELLO")
    expect(storageHelper.getItem("HELLO")).toBeNull()

    storageHelper.setItem("A", "a")
    storageHelper.clear()
    expect(storageHelper.length).toBe(0)
  })

  test("和 localStorage 的兼容性", () => {
    localStorage.setItem("HELLO", JSON.stringify({ data: { hello: "HELLO" }, _expire: Number.MAX_SAFE_INTEGER }))
    localStorage.setItem("TEST_HELLO", JSON.stringify({ data: { hello: "TEST_HELLO" }, _expire: Number.MAX_SAFE_INTEGER }))
    localStorage.setItem("TEST_HELLO_EXP", JSON.stringify({ data: { hello: "TEST_HELLO_EXP" }, _expire: [1] }))

    expect(storageHelper.getItem("HELLO")).toEqual({ hello: "TEST_HELLO" })
    expect(storageHelper.getItem("HELLO_EXP")).toBeNull()
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

  test("keys 和 clear", () => {
    const storageHelper1 = new StorageHelper("TEST1")

    storageHelper.setItem("A", 1)
    storageHelper.setItem("B", 2)
    storageHelper1.setItem("C", 3)
    storageHelper1.setItem("D", 4)

    expect(storageHelper.keys()).toEqual(["A", "B"])
    expect(storageHelper.keys(true)).toEqual(["TEST_A", "TEST_B"])
    expect(localStorage.length).toBe(4)

    storageHelper.clear()
    expect(storageHelper.keys()).toEqual([])
    expect(storageHelper1.keys(true)).toEqual(["TEST1_C", "TEST1_D"])
    expect(localStorage.length).toBe(2)

    storageHelper1.clear()
    expect(localStorage.length).toBe(0)
  })
})
